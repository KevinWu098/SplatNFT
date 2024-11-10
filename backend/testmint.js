import { mintNFT } from './index.js';

async function testMint() {
    const metadataUri = 'ipfs://<YOUR_METADATA_CID>';
    const name = 'Test NFT';
    const symbol = 'TNFT';
    
    const nft = await mintNFT(metadataUri, name, symbol);
    console.log('NFT Minted:', nft);
}

testMint().catch(console.error);
