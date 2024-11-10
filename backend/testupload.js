const { uploadMetadataToIPFS } = require('./index');

async function testUpload() {
    const sampleMetadata = {
        name: "Test NFT",
        description: "This is a test NFT",
        attributes: [
            {
                trait_type: "Type",
                value: "Test Asset"
            },
            {
                trait_type: "Content",
                value: "Sample Content"
            }
        ],
        // Optional: Add an image or other fields if needed
    };

    try {
        const metadataUri = await uploadMetadataToIPFS(sampleMetadata);
        console.log('Metadata URI:', metadataUri);
    } catch (error) {
        console.error('Error during test upload:', error);
    }
}

testUpload();
