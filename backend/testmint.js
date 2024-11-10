import { mintNFT } from "./index.js";
import { uploadMetadataToIPFS } from "./testupload.js";

async function testMint() {
  // Define metadata with additional "splat" details
  const metadata = {
    name: "Test NFT",
    description: "A test NFT with splat details",
    symbol: "TNFT",
    splat: {
      points: 100, // Example value
      resolution: "1024x768", // Example value
      size: "500KB", // Example value
    },
  };

  // Upload metadata to IPFS and retrieve the URI (CID)
  const metadataUri = await uploadMetadataToIPFS(metadata);

  // Mint the NFT with the metadata URI and retrieve the NFT details
  const nft = await mintNFT(metadataUri, metadata.name, metadata.symbol);

  // Log the entire NFT object to examine its structure
  // console.log('NFT Object:', nft);

  // Log the NFT details including splat details if `updateAuthority` is available
  console.log("NFT Minted:", {
    name: nft.name,
    owner: nft.updateAuthority, // NFT owner address
    splat: metadata.splat,
  });
}

testMint().catch(console.error);
