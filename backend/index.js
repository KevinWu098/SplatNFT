import express from 'express';
import {Anon, AnonSocksClient} from '@anyone-protocol/anyone-client';
import { Connection, clusterApiUrl, Keypair } from '@solana/web3.js';
import { Metaplex, keypairIdentity } from '@metaplex-foundation/js';
import { Web3Storage, File } from 'web3.storage'; // Updated import
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json()); // To parse JSON

// ENV
const {
    SOLANA_PRIVATE_KEY,
    SOLANA_NETWORK,
    WEB3_STORAGE_API_KEY, // Updated variable name
    PORT = 5000,
} = process.env;

//Initializa Anon and AnonSocksClient 
const anon = new Anon();
await anon.start();
const anonClient = new AnonSocksClient(anon);

async function uploadMetadataToIPFS(metadata) {
    try{
        console.log("Uploading metadata to IPFS via Web3.storage...");

        // Convert metadata JSON to a File object
        const metadataBlob = new Blob([JSON.stringify(metadata)], { type: 'application/json' });
        const metadataFile = new File([metadataBlob], 'metadata.json');

        // Prepare request options
        const data = [metadataFile];
        const url = `https://api.web3.storage/upload`;
        const config = {
            headers: {
                Authorization: `Bearer ${WEB3_STORAGE_API_KEY}`,
                'Content-Type': 'multipart/form-data',
            },
        };

        // Send the request through AnonSocksClient
        const response = await anonClient.post(url, data, config);
        const cid = response.data.cid;

        console.log('Metadata successfully uploaded to IPFS with CID:', cid);
        return `ipfs://${cid}/metadata.json`; // Adjusted URI
    } catch (error) {
        console.error('Error uploading metadata to IPFS via AnonSocksClient:', error);
        throw new Error('Failed to upload metadata to IPFS');
    }
}

app.post('/mint-nft', async (req, res) => {
    try {
        const { content, name, description, symbol, points, resolution, size } = req.body;

        if (!content || !name || !description || !symbol) {
            return res.status(400).json({ error: 'Missing required fields: content, name, description, symbol' });
        }

        const metadata = {
            name: name,
            description: description,
            symbol: symbol,
            supercalifragilisticexpialidocious: {
                points: points,
                resolution: resolution,
                size: size,
            },
        };

        // Upload metadata through AnonSocksClient
        const metadataUri = await uploadMetadataToIPFS(metadata);
        console.log('Metadata uploaded to IPFS:', metadataUri);

        // Mint the NFT
        const nft = await mintNFT(metadataUri, name, symbol);
        console.log('NFT minted:', nft);

        // Respond with NFT details through AnonSocksClient (optional)
        const responseUrl = `http://your-frontend-url.com/api/nft-response`; // Example frontend URL for further handling
        const responseData = {
            nft: {
                name: nft.name,
                symbol: nft.symbol,
                uri: nft.uri,
                mintAddress: nft.address.toBase58(),
                sellerFeeBasisPoints: nft.sellerFeeBasisPoints,
                updateAuthority: nft.updateAuthority.toBase58(),
                primarySaleHappened: nft.primarySaleHappened,
            },
            gaussianSplatData: metadata.supercalifragilisticexpialidocious,
            metadataUri: metadataUri,
        };
        
        await anonClient.post(responseUrl, responseData);

        // Send regular HTTP response to client
        res.status(200).json(responseData);

    } catch (error) {
        console.error('Error in /mint-nft:', error);
        res.status(500).json({ error: 'Failed to mint NFT' });
    }
});

process.on('exit', async () => {
    await anon.stop();
    console.log('Anon network stopped');
});

// // Validate ENV
// if (!SOLANA_PRIVATE_KEY) {
//     console.error('Missing SOLANA_PRIVATE_KEY in environment variables.');
//     process.exit(1);
// }
// if (!WEB3_STORAGE_API_KEY) { // Updated validation
//     console.error('Missing WEB3_STORAGE_API_KEY in environment variables.');
//     process.exit(1);
// }

// // Initialize Solana Wallet
// let secretKey;
// try {
//     secretKey = Uint8Array.from(JSON.parse(SOLANA_PRIVATE_KEY));
// } catch (error) {
//     console.error('Invalid SOLANA_PRIVATE_KEY format. It should be a JSON array.');
//     process.exit(1);
// }

// const walletKeypair = Keypair.fromSecretKey(secretKey);

// // Initialize Solana Connection
// const connection = new Connection(
//     clusterApiUrl(SOLANA_NETWORK),
//     'confirmed'
// );

// // Initialize Metaplex Instance
// const metaplex = Metaplex.make(connection).use(keypairIdentity(walletKeypair));

// // Initialize Web3.storage Client
// const web3StorageClient = new Web3Storage({ token: WEB3_STORAGE_API_KEY });

// // Console log the wallet address
// async function uploadMetadataToIPFS(metadata) {
//     try {
//         console.log("Uploading metadata to IPFS via Web3.storage...");

//         // Convert metadata JSON to a File object
//         const metadataBlob = new Blob([JSON.stringify(metadata)], { type: 'application/json' });
//         const metadataFile = new File([metadataBlob], 'metadata.json');

//         // Upload the File to Web3.storage
//         const cid = await web3StorageClient.put([metadataFile], {
//             // You can add additional options here if needed
//             // e.g., wrapWithDirectory: false
//         });

//         console.log('Metadata successfully uploaded to IPFS with CID:', cid);
//         return `ipfs://${cid}/metadata.json`; // Adjusted URI
//     } catch (error) {
//         console.error('Error uploading metadata to IPFS via Web3.storage:', error);
//         throw new Error('Failed to upload metadata to IPFS');
//     }
// }

export async function mintNFT(metadataUri, name, symbol, sellerFeeBasisPoints = 500) {
    try {
        const nft = await metaplex.nfts().create({
            uri: metadataUri,
            name: name,
            symbol: symbol,
            sellerFeeBasisPoints: sellerFeeBasisPoints,
            maxSupply: 1, // For single NFTs
        });
        // Fetch the updateAuthority or set the owner if available
        const updateAuthority = nft.updateAuthority ? nft.updateAuthority : "Unknown";

        return {
            name: nft.name,
            uri: nft.uri,
            symbol: nft.symbol,
            updateAuthority, // Ensure updateAuthority is included in the return object
        };
    } catch (error) {
        console.error('Error minting NFT:', error);
        throw new Error('Failed to mint NFT');
    }
}

// // API Router
// app.post('/mint-nft', async (req, res) => {
//     try {
//         const { content, name, description, symbol } = req.body;

//         // Input Validation
//         if (!content || !name || !description || !symbol) {
//             return res.status(400).json({ error: 'Missing required fields: content, name, description, symbol' });
//         }

//         // Create Metadata Object
//         const metadata = {
//             name: name,
//             description: description,
//             symbol: symbol,
//             supercalifragilisticexpialidocious: {
//                 points: points,
//                 resolution: resolution,
//                 size: size,
//             },
//         };

//         // Upload Metadata to IPFS
//         const metadataUri = await uploadMetadataToIPFS(metadata);
//         console.log('Metadata uploaded to IPFS:', metadataUri);

//         // Mint the NFT
//         const nft = await mintNFT(metadataUri, name, symbol);
//         console.log('NFT minted:', nft);

//         // Respond with NFT details
//         res.status(200).json({
//             nft: {
//                 name: nft.name,
//                 symbol: nft.symbol,
//                 uri: nft.uri,
//                 mintAddress: nft.address.toBase58(),
//                 sellerFeeBasisPoints: nft.sellerFeeBasisPoints,
//                 updateAuthority: nft.updateAuthority.toBase58(),
//                 primarySaleHappened: nft.primarySaleHappened,
//             },
//             gaussianSplatData: metadata.supercalifragilisticexpialidocious,
//             metadataUri: metadataUri,
//         });
//     } catch (error) {
//         console.error('Error in /mint-nft:', error);
//         res.status(500).json({ error: 'Failed to mint NFT' });
//     }
// });

// // Start server
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });

// // Export functions for testing or other purposes
// export { uploadMetadataToIPFS };

