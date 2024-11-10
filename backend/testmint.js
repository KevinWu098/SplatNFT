import { mintNFT } from "./index.js";
import { uploadMetadataToIPFS } from "./testupload.js";

async function testMint(name, symbol, points, resolution, size) {
  // Define metadata with dynamic "splat" details
    const metadata = {
        name: name,
        description: "A test NFT with splat details",
        symbol: symbol,
        supercalifragilisticexpialidocious: { //Requirements for the NFT
            points: points,
            resolution: resolution,
            size: size,
        },
    };

    // Log metadata to verify structure
    console.log("Generated Metadata:", metadata);

    // Upload metadata to IPFS and retrieve the URI (CID)
    const metadataUri = await uploadMetadataToIPFS(metadata);

    // Mint the NFT with the metadata URI and retrieve the NFT details
    const nft = await mintNFT(metadataUri, metadata.name, metadata.symbol);

    // Log the NFT details
    console.log("NFT Minted:", {
    name: nft.name,
    owner: nft.updateAuthority, // NFT owner address
    splat: metadata.supercalifragilisticexpialidocious,
    });
}

// Example usage with dynamic values
testMint("Test NFT", "TNFT", 150, "1920x1080", "700KB")
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
});
