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
import ffmpeg from 'fluent-ffmpeg';
import ffmpegPath from 'ffmpeg-static';
import OpenAI from 'openai';
import { z } from 'zod';
import { zodResponseFormat } from 'openai/helpers/zod';
import { create } from "@web3-storage/w3up-client";
import JSZip from 'jszip';
import axios from 'axios';


dotenv.config();

const openai = new OpenAI();

// Zod schema for structured response
const MemorySchema = z.object({
  name: z.string(),
  description: z.string(),
});

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

        // Extract frames
        const framesOutputDir = path.join(process.cwd(), 'temp', 'frames', path.parse(req.file.originalname).name);
        const framePaths = await extractFrames(savedVideoPath, 4, framesOutputDir);

        // Encode frames to base64
        const base64Images = await Promise.all(
        framePaths.map((framePath) => encodeImageToBase64(framePath))
        );

        // Analyze frames with OpenAI
        const memory = await analyzeFrames(base64Images);
        console.log(memory);



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

            // Read the PLY file
            console.log('Reading PLY file...');
            const plyData = await fs.readFile(plyDestPath);
            const plySize = `${(plyData.length / 1024).toFixed(2)}KB`;
            console.log(`PLY file size: ${plySize}`);

            // Create File object from PLY data
            console.log('Creating File object from PLY data...');
            const plyFile = new File([plyData], 'point_cloud.ply', {
                type: 'application/octet-stream'
            });
            console.log('PLY File object created successfully');

            // Initialize w3up client
            console.log('Initializing w3up client...');
            const client = await create();
            console.log('Logging in to w3up client...');
            await client.login('aurelia.sindhu@gmail.com');
            console.log('Setting current space...');
            await client.setCurrentSpace(process.env.WEB3_STORAGE_API_KEY);
            console.log('W3up client initialized and configured');


            console.log('Creating metadata object...');
            const metadata = {
                name: memory.name,
                description: memory.description,
                size: plySize
            };
            console.log('Metadata object created');

            console.log('Creating metadata file...');
            const blob = new Blob([JSON.stringify(metadata)], { type: 'application/json' });
            const plyMetadata = new File([blob], 'point_cloud.ply_metadata.json');
            console.log('Metadata file created');

            console.log('Uploading files to IPFS...');
            const directoryCid = await client.uploadDirectory([
                plyFile,
                plyMetadata
            ]);
            console.log('Directory CID:', directoryCid.toString());

            return res.json({
                success: true,
                metadata,
                ipfsCid: directoryCid.toString()
            });

        } catch (error) {
            console.error('Failed during video processing:', error);
            throw new Error('Failed to process video file');
        }
        

        

    } catch (error) {
        console.error('Error in /mint-nft:', error);
        res.status(500).json({ error: 'Failed to mint NFT' });
    }
});

// Route for downloading NFT data from IPFS
app.get('/download-nft/:cid', async (req, res) => {
    console.log('Received request to download NFT data');
    try {
        const { cid } = req.params;

        // Define the files you want to download
        const filesToDownload = [
            {
                fileName: 'point_cloud.ply',
                metadataName: 'point_cloud.ply_metadata.json'
            },
            // Add more files if necessary
        ];

        const zip = new JSZip();

        // Iterate over each file and download
        for (const file of filesToDownload) {
            const fileGatewayUrl = `https://${cid}.ipfs.w3s.link/${file.fileName}`;
            const metadataGatewayUrl = `https://${cid}.ipfs.w3s.link/${file.metadataName}`;

            // Download the main file
            const fileResponse = await axios.get(fileGatewayUrl, { responseType: 'arraybuffer' });
            zip.file(file.fileName, fileResponse.data);

            // Download the metadata file
            const metadataResponse = await axios.get(metadataGatewayUrl, { responseType: 'arraybuffer' });
            zip.file(file.metadataName, metadataResponse.data);

            console.log(`Downloaded ${file.fileName} and ${file.metadataName}`);
        }

        // Generate ZIP file
        const zipContent = await zip.generateAsync({ type: 'nodebuffer' });

        // Set response headers for ZIP download
        res.setHeader('Content-Type', 'application/zip');
        res.setHeader('Content-Disposition', `attachment; filename="nft-${cid}.zip"`);

        // Send the ZIP file
        res.send(zipContent);

    } catch (error) {
        console.error('Error downloading NFT data:', error.message);

        if (error.response && error.response.status === 404) {
            return res.status(404).json({ error: 'Files not found on IPFS' });
        }

        res.status(500).json({ error: 'Failed to download NFT data' });
    }
});

// Test route that returns hardcoded metadata
app.get('/test', (req, res) => {
    try {
        res.json({
            success: true,
            metadata: {
                name: "Late Night Study Session",
                description: "A focused student working diligently on a laptop in a cozy study environment. The scene captures the essence of late-night motivation, surrounded by snacks and drinks, as she types away, possibly on a project or assignment, immersed in her work while others around her are also engaged in their studies.",
                size: "270674.36KB"
            },
            ipfsCid: "bafybeidqtnxw7plpzbdlugxkjvl7qok7hqvtildjhjc7dfphkszqc3axye"
        });
    } catch (error) {
        console.error('Error in test route:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

/**
 * Extracts a specified number of frames evenly spaced from a video.
 * @param {string} videoPath - Path to the input video file.
 * @param {number} frameCount - Number of frames to extract.
 * @param {string} outputDir - Directory to save extracted frames.
 * @returns {Promise<string[]>} - Array of file paths to the extracted frames.
 */
async function extractFrames(videoPath, frameCount, outputDir) {
  // Ensure output directory exists
  await fs.mkdir(outputDir, { recursive: true });

  // Get video duration
  const getVideoDuration = () => {
    return new Promise((resolve, reject) => {
      ffmpeg.ffprobe(videoPath, (err, metadata) => {
        if (err) reject(err);
        else resolve(metadata.format.duration);
      });
    });
  };

  const duration = await getVideoDuration();
  const interval = duration / (frameCount + 1);

  const framePromises = [];

  for (let i = 1; i <= frameCount; i++) {
    const timestamp = interval * i;
    const outputPath = path.join(outputDir, `frame_${i}.png`);

    const promise = new Promise((resolve, reject) => {
      ffmpeg(videoPath)
        .screenshots({
          timestamps: [timestamp],
          filename: `frame_${i}.png`,
          folder: outputDir,
          size: '512x512', // Adjust size as needed
        })
        .on('end', () => resolve(outputPath))
        .on('error', (err) => reject(err));
    });

    framePromises.push(promise);
  }

  /**
 * Encodes an image file to a base64 string.
 * @param {string} imagePath - Path to the image file.
 * @returns {Promise<string>} - Base64 encoded string of the image.
 */
async function encodeImageToBase64(imagePath) {
  const imageBuffer = await fs.readFile(imagePath);
  const mimeType = getMimeType(imagePath);
  return `data:${mimeType};base64,${imageBuffer.toString('base64')}`;
}

/**
 * Determines the MIME type based on the file extension.
 * @param {string} filePath - Path to the file.
 * @returns {string} - MIME type.
 */
function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.png':
      return 'image/png';
    case '.gif':
      return 'image/gif';
    default:
      return 'application/octet-stream';
  }
}


  return Promise.all(framePromises);
}

/**
 * Encodes an image file to a base64 string.
 * @param {string} imagePath - Path to the image file.
 * @returns {Promise<string>} - Base64 encoded string of the image.
 */
async function encodeImageToBase64(imagePath) {
  const imageBuffer = await fs.readFile(imagePath);
  const mimeType = getMimeType(imagePath);
  return `data:${mimeType};base64,${imageBuffer.toString('base64')}`;
}

/**
 * Determines the MIME type based on the file extension.
 * @param {string} filePath - Path to the file.
 * @returns {string} - MIME type.
 */
function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.png':
      return 'image/png';
    case '.gif':
      return 'image/gif';
    default:
      return 'application/octet-stream';
  }
}


/**
 * Sends base64-encoded frame images to OpenAI for analysis and returns the parsed memory.
 * @param {string[]} base64Images - Array of base64-encoded image strings.
 * @returns {Promise<{ name: string, description: string }>} - Parsed memory.
 */
async function analyzeFrames(base64Images) {
  // Construct messages with base64 images
  const messages = [
    {
      role: 'user',
      content: [
        { type: 'text', text: 'You are an agent that is transforming photos into memories. What is depicted in these images? Provide a name and a brief description for this memory.' },
        ...base64Images.map((base64) => ({
          type: 'image_url',
          image_url: {
            url: base64,
          },
        })),
      ],
    },
  ];

  // Send request to OpenAI
  const response = await openai.beta.chat.completions.parse({
    model: 'gpt-4o-mini', // Replace with the appropriate model if needed
    messages,
    response_format: zodResponseFormat(MemorySchema, "memory"),

    // You can adjust other parameters like temperature, max_tokens, etc., as needed
  });
  // Parse the response using Zod
  const memory = response.choices[0].message.parsed;
  return memory;
}


export { uploadMetadataToIPFS };
