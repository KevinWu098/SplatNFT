const express = require('express');
const { Connection, clusterApiUrl, Keypair } = require('@solana/web3.js');
const { Metaplex, keypairIdentity } = require('@metaplex-foundation/js');
const { NFTStorage } = require('nft.storage');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json()); // To parse JSON

// ENV
const {
    SOLANA_PRIVATE_KEY,
    SOLANA_NETWORK,
    NFT_STORAGE_API_KEY,
    PORT = 5000,
} = process.env;

// Validate ENV
if (!SOLANA_PRIVATE_KEY) {
    console.error('Missing SOLANA_PRIVATE_KEY in environment variables.');
    process.exit(1);
}
if (!NFT_STORAGE_API_KEY) {
    console.error('Missing NFT_STORAGE_API_KEY in environment variables.');
    process.exit(1);
}

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

    // .use(storage().bundlr({
    //     address: 'https://devnet.bundlr.network', 
    //     providerUrl: clusterApiUrl(SOLANA_NETWORK),
    //     timeout: 60000,
    //     })
    // );

// Initialize NFT.Storage Client
const nftStorageClient = new NFTStorage({ token: NFT_STORAGE_API_KEY });

//Console log the wallet address
// async function uploadMetadataToIPFS(metadata) {
//     try {
//         const metadataBlob = new Blob([JSON.stringify(metadata)], { type: 'application/json' });
//         const metadataFile = new File([metadataBlob], 'metadata.json');
//         const cid = await nftStorageClient.storeBlob(metadataFile);
//         return `ipfs://${cid}`;
//     } catch (error) {
//         console.error('Error uploading metadata to IPFS:', error);
//         throw new Error('Failed to upload metadata to IPFS');
//     }
// }

async function uploadMetadataToIPFS(metadata) {
    try {
        const cid = await nftStorageClient.storeJSON(metadata);
        console.log('Metadata successfully uploaded to IPFS with CID:', cid);
        return `ipfs://${cid}`;
    } catch (error) {
        // Check if error has a response from nft.storage
        if (error.response) {
            console.error('NFT.Storage API Error:', error.response.status, error.response.statusText);
            console.error('Response Body:', error.response.body);
        } else {
            console.error('Error uploading metadata to IPFS:', error.message);
        }
        throw new Error('Failed to upload metadata to IPFS');
    }
}



async function mintNFT(metadataUri, name, symbol, sellerFeeBasisPoints = 500) {
    try {
        const nft = await metaplex.nfts().create({
        uri: metadataUri,
        name: name,
        symbol: symbol,
        sellerFeeBasisPoints: sellerFeeBasisPoints,
        maxSupply: 1, // For single NFTs
        });
        return nft;
    } catch (error) {
        console.error('Error minting NFT:', error);
        throw new Error('Failed to mint NFT');
    }
}

//API Router
app.post('/mint-nft', async (req, res) => {
    try {
        const { content, name, description, symbol } = req.body;

        // Input Validation
        if (!content || !name || !description || !symbol) {
        return res.status(400).json({ error: 'Missing required fields: content, name, description, symbol' });
        }

        // Create Metadata Object
        const metadata = {
        name: name,
        description: description,
        attributes: [
            {
            trait_type: 'Type',
            value: 'String Asset',
            },
            {
            trait_type: 'Content',
            value: content,
            },
        ],
        // You can add an image or other fields if needed
    };

    // Upload Metadata to IPFS
    const metadataUri = await uploadMetadataToIPFS(metadata);
    console.log('Metadata uploaded to IPFS:', metadataUri);

    // Mint the NFT
    const nft = await mintNFT(metadataUri, name, symbol);
    console.log('NFT minted:', nft);

    // Respond with NFT details
    res.status(200).json({
        nft: {
            name: nft.name,
            symbol: nft.symbol,
            uri: nft.uri,
            mintAddress: nft.address.toBase58(),
            sellerFeeBasisPoints: nft.sellerFeeBasisPoints,
            updateAuthority: nft.updateAuthority.toBase58(),
            primarySaleHappened: nft.primarySaleHappened,
        },
        metadataUri: metadataUri,
        });
    } catch (error) {
        console.error('Error in /mint-nft:', error);
        res.status(500).json({ error: 'Failed to mint NFT' });
    }
    });

//Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

//Testing
module.exports = {
    uploadMetadataToIPFS,
    mintNFT,
};
