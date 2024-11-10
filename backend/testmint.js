// Import necessary modules
import { readFileSync } from "fs";
import path from "path";
import dotenv from "dotenv";
import { create } from "@web3-storage/w3up-client";


dotenv.config(); // Load environment variables from .env

async function testMintPLY(name, symbol, plyFilename) {
    console.log("Starting testMintPLY function...");

    // Read the PLY file
    console.log(`Reading PLY file from uploads/${plyFilename}...`);
    const plyPath = path.join("uploads", plyFilename);
    const plyData = readFileSync(plyPath);
    const plySize = `${(plyData.length / 1024).toFixed(2)}KB`;
    console.log(`PLY file size: ${plySize}`);

    // Create File object from PLY data
    console.log("Creating File object from PLY data...");
    const plyFile = new File([plyData], plyFilename, {
        type: "application/octet-stream"
    });
    console.log("PLY File object created successfully");

    // Initialize w3up client
    console.log("Initializing w3up client...");
    const client = await create();
    console.log("Logging in to w3up client...");
    await client.login("aurelia.sindhu@gmail.com");
    console.log("Setting current space...");
    await client.setCurrentSpace(process.env.WEB3_STORAGE_API_KEY);
    console.log("W3up client initialized and configured");

    console.log("Creating metadata object...");
    const metadata = {
        name: "Hi",
        description: "Test"
    }
    console.log("Metadata object created");

    console.log("Creating metadata file...");
    const blob = new Blob([JSON.stringify(metadata)], { type: 'application/json' })
    const plyMetadata = new File([blob], plyFilename + "_metadata.json")
    console.log("Metadata file created");

    console.log("Uploading files to IPFS...");
    const directoryCid = await client.uploadDirectory([
        plyFile,
        plyMetadata
    ])
    console.log("Directory CID:", directoryCid.toString());

}

// Example usage with PLY file
testMintPLY("Point Cloud NFT", "PCNFT", "point_cloud.ply")
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
