const mintNFT = async (nftData) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/mint-nft`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nftData),
        });
        if (!response.ok) {
            throw new Error('Failed to mint NFT');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error minting NFT:', error);
        throw error;
    }
};

export { mintNFT };
