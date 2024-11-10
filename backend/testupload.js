// testupload.js

import { create } from "@web3-storage/w3up-client";
import { Signer } from "@ucanto/principal/ed25519";
import dotenv from "dotenv";
import { CarReader } from "@ipld/car";
import { importDAG } from "@ucanto/core/delegation";
import fs from "fs/promises"; // For reading files, if needed

// Load environment variables from .env file
dotenv.config();

/**
 * Uploads metadata to IPFS using w3up-client.
 * @param {Object} metadata - The metadata object to upload.
 * @returns {Promise<string>} - The IPFS URI of the uploaded metadata.
 */
async function uploadMetadataToIPFS(metadata) {
  try {
    // Initialize the w3up-client
    const client = await create();

    // Define your existing Space's DID
    const spaceDid = process.env.WEB3_STORAGE_API_KEY; // Replace with your Space DID

    // Use the account with the client
    const account = await client.login("aurelia.sindhu@gmail.com");

    await client.setCurrentSpace(spaceDid);
    console.log(`Set current Space to: ${spaceDid}`);

    // Convert metadata to JSON string
    const metadataContent = JSON.stringify(metadata);

    // Create a File instance compatible with w3up-client
    const metadataFile = new File([metadataContent], "metadata.json", {
      type: "application/json",
    });

    console.log("File created successfully.");

    // Upload the file using uploadFile
    const cid = await client.uploadFile(metadataFile);

    console.log(
      "Metadata successfully uploaded to IPFS with CID:",
      cid.toString()
    );

    return `ipfs://${cid.toString()}/metadata.json`; // Construct the IPFS URI pointing to metadata.json
  } catch (error) {
    console.error("Error uploading metadata to IPFS via w3up-client:", error);
    throw new Error("Failed to upload metadata to IPFS");
  }
}

/**
 * Parses a base64-encoded CAR file into a Delegation object.
 * @param {string} data - Base64 encoded CAR file.
 * @returns {Promise<Delegation>} - The parsed Delegation object.
 */
async function parseProof(data) {
  const blocks = [];
  const reader = await CarReader.fromBytes(Buffer.from(data, "base64"));
  for await (const block of reader.blocks()) {
    blocks.push(block);
  }
  return importDAG(blocks);
}

/**
 * Test function to upload sample metadata to IPFS.
 */
async function testUpload() {
  const sampleMetadata = {
    name: "Test NFT",
    description: "This is a test NFT",
    attributes: [
      {
        trait_type: "Type",
        value: "Test Asset",
      },
      {
        trait_type: "Content",
        value: "Sample Content",
      },
    ],
    // Optional: Add an image or other fields if needed
  };

  try {
    const metadataUri = await uploadMetadataToIPFS(sampleMetadata);
    console.log("Metadata URI:", metadataUri);
  } catch (error) {
    console.error("Error during test upload:", error);
  }
}

// Execute the test upload function
testUpload();
