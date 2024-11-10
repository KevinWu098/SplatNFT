import express from 'express';
import multer from 'multer';
import { Anon, AnonSocksClient } from '@anyone-protocol/anyone-client';
import { Connection, clusterApiUrl, Keypair } from '@solana/web3.js';
import { Metaplex, keypairIdentity } from '@metaplex-foundation/js';
import { Web3Storage, File } from 'web3.storage';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';
import cors from 'cors';
import { exec } from 'child_process';

dotenv.config();

const app = express();
app.use(express.json()); // To parse JSON
app.use(cors());

// File upload configuration for multer
const upload = multer({ dest: 'uploads/' });

// ENV
const {
    SOLANA_PRIVATE_KEY,
    SOLANA_NETWORK,
    WEB3_STORAGE_API_KEY,
    PORT = 5001,
} = process.env; 

// Initialize Anon and AnonSocksClient 
const anon = new Anon();
await anon.start();
const anonClient = new AnonSocksClient(anon);

// Initialize Solana Wallet
let secretKey;
try {
    secretKey = Uint8Array.from(JSON.parse(SOLANA_PRIVATE_KEY));
} catch (error) {
    console.error('Invalid SOLANA_PRIVATE_KEY format. It should be a JSON array.');
    process.exit(1);
}

const walletKeypair = Keypair.fromSecretKey(secretKey);

// Initialize Solana Connection
const connection = new Connection(
    clusterApiUrl(SOLANA_NETWORK),
    'confirmed'
);

// Initialize Metaplex Instance
const metaplex = Metaplex.make(connection).use(keypairIdentity(walletKeypair));

// Initialize Web3.storage Client
const web3StorageClient = new Web3Storage({ token: WEB3_STORAGE_API_KEY });

// Placeholder for MP4 to PLY conversion
// async function convertMp4ToPly(mp4FilePath) {
//     //Bill's code
//     // const plyFilePath = path.join('uploads', `${path.basename(mp4FilePath, '.mp4')}.ply`);
//     const plyFilePath = await convertMp4ToPly(req.file.path);
//     return plyFilePath;
// }

// Function to convert PLY file to string
async function convertPlyToString(plyFilePath) {
    try {
        const plyData = await fs.readFile(plyFilePath, 'utf8');
        return plyData.toString();
    } catch (error) {
        console.error('Error converting PLY file to string:', error);
        throw new Error('Failed to convert PLY to string');
    }
}

// Upload metadata to IPFS
async function uploadMetadataToIPFS(metadata) {
    try {
        console.log("Uploading metadata to IPFS via Web3.storage...");
        const metadataBlob = new Blob([JSON.stringify(metadata)], { type: 'application/json' });
        const metadataFile = new File([metadataBlob], 'metadata.json');
        const cid = await web3StorageClient.put([metadataFile]);

        console.log('Metadata successfully uploaded to IPFS with CID:', cid);
        return `ipfs://${cid}/metadata.json`;
    } catch (error) {
        console.error('Error uploading metadata to IPFS:', error);
        throw new Error('Failed to upload metadata to IPFS');
    }
}

// Mint NFT function
async function mintNFT(metadataUri) {
    try {
        const nft = await metaplex.nfts().create({
            uri: metadataUri,
            name: "PLY NFT",
            symbol: "PLYNFT",
            sellerFeeBasisPoints: 500,
            maxSupply: 1,
        });

        return {
            name: nft.name,
            uri: nft.uri,
            symbol: nft.symbol,
            updateAuthority: nft.updateAuthority.toBase58(),
        };
    } catch (error) {
        console.error('Error minting NFT:', error);
        throw new Error('Failed to mint NFT');
    }
}

// Route for minting NFT with an MP4 input file
app.post('/mint-nft', upload.single('video'), async (req, res) => {
    console.log('Received request on /mint-nft');
    try {
        // Check if the file is present
        if (!req.file) {
            return res.status(400).json({ error: 'Missing required field: MP4 video file' });
        }

        const savedVideoPath = path.join(req.file.originalname);
        await fs.rename(req.file.path, savedVideoPath);

        // Clean up previous files and directories
        try {
            await fs.rm('timing.txt', { force: true });
            await fs.rm('data', { recursive: true, force: true });
            await fs.rm('trained_model', { recursive: true, force: true });
            
            // Create required directories
            await fs.mkdir('data', { recursive: true });
            await fs.mkdir('data/input', { recursive: true });
            
            // Run ffmpeg command to extract frames
            const ffmpegCommand = `ffmpeg -i ${savedVideoPath} -vf fps=2 data/input/frame_%04d.png`;
            
            await new Promise((resolve, reject) => {
                exec(ffmpegCommand, (error, stdout, stderr) => {
                    if (error) {
                        console.error(`Error executing ffmpeg: ${error}`);
                        reject(error);
                    }
                    resolve();
                });
            });

            console.log('Successfully extracted frames from video');

            // Convert frames
            const convertCommand = `xvfb-run python gaussian-splatting/convert.py -s data`;
            await new Promise((resolve, reject) => {
                exec(convertCommand, (error, stdout, stderr) => {
                    if (error) {
                        console.error(`Error converting frames: ${error}`);
                        reject(error);
                    }
                    resolve();
                });
            });

            console.log('Successfully converted frames');

            // Train model
            const trainCommand = `xvfb-run python gaussian-splatting/train.py -s data -m trained_model --iterations 7000`;
            await new Promise((resolve, reject) => {
                exec(trainCommand, (error, stdout, stderr) => {
                    if (error) {
                        console.error(`Error training model: ${error}`);
                        reject(error);
                    }
                    resolve();
                });
            });

            console.log('Successfully trained model');

            // Copy the trained model PLY file to current directory
            const plySourcePath = path.join('trained_model', 'point_cloud', 'iteration_7000', 'point_cloud.ply');
            const plyDestPath = 'point_cloud.ply';

            await fs.copyFile(plySourcePath, plyDestPath);
            console.log('Successfully copied PLY file to current directory');

        } catch (error) {
            console.error('Failed during video processing:', error);
            throw new Error('Failed to process video file');
        }
        // if (!req.file || req.file.mimetype !== 'video/mp4') {
        //     return res.status(400).json({ error: 'File is missing or is not an MP4 video' });
        // }        

        // Convert the uploaded MP4 file to PLY format
        // const plyFilePath = await convertMp4ToPly(req.file.path);
        
        // Convert the resulting PLY file to a string
        // const plyString = await convertPlyToString(plyFilePath);

        // Create metadata with PLY data included
        const metadata = {
            name: "PLY NFT",
            description: "An NFT created with PLY data derived from an MP4 video",
            symbol: "PLYNFT",
            supercalifragilisticexpialidocious: {
                plyData: plyString, // Store the PLY data as a string in metadata
            },
        };

        // Upload metadata to IPFS
        const metadataUri = await uploadMetadataToIPFS(metadata);
        console.log('Metadata uploaded to IPFS:', metadataUri);

        // Mint the NFT
        const nft = await mintNFT(metadataUri);
        console.log('NFT minted:', nft);

        res.status(200).json({
            nft: {
                name: nft.name,
                symbol: nft.symbol,
                uri: nft.uri,
                updateAuthority: nft.updateAuthority,
            },
            metadataUri,
        });

    } catch (error) {
        console.error('Error in /mint-nft:', error);
        res.status(500).json({ error: 'Failed to mint NFT' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export { uploadMetadataToIPFS, mintNFT };
