const { NFTStorage } = require('nft.storage');
const { Metaplex, keypairIdentity } = require('@metaplex-foundation/js');
const { Connection, clusterApiUrl, Keypair } = require('@solana/web3.js');
const dotenv = require('dotenv');

dotenv.config();

// ENV
const {
    SOLANA_PRIVATE_KEY,
    SOLANA_NETWORK,
    NFT_STORAGE_API_KEY,
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

// Initialize NFT.Storage Client
const nftStorageClient = new NFTStorage({ token: NFT_STORAGE_API_KEY });

// Function to upload metadata to IPFS
async function uploadMetadataToIPFS(metadata) {
    try {
        const cid = await nftStorageClient.storeJSON(metadata);
        console.log('Metadata successfully uploaded to IPFS with CID:', cid);
        return `ipfs://${cid}`;
    } catch (error) {
        // Enhanced Error Logging
        if (error.response) {
            console.error('NFT.Storage API Error:', error.response.status, error.response.statusText);
            console.error('Response Body:', error.response.body);
        } else {
            console.error('Error uploading metadata to IPFS:', error.message);
        }
        throw new Error('Failed to upload metadata to IPFS');
    }
}

// Function to mint NFT
async function mintNFT(metadataUri, name, symbol, sellerFeeBasisPoints = 500) {
    try {
        const nft = await metaplex.nfts().create({
            uri: metadataUri,
            name: name,
            symbol: symbol,
            sellerFeeBasisPoints: sellerFeeBasisPoints,
            maxSupply: 1, // For single NFTs
        });
        console.log('NFT successfully minted:', nft);
        return nft;
    } catch (error) {
        console.error('Error minting NFT:', error);
        throw new Error('Failed to mint NFT');
    }
}

module.exports = {
    uploadMetadataToIPFS,
    mintNFT,
    walletKeypair, // Exporting in case needed
};
