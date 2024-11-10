// pages/mint.tsx
import { useState, ChangeEvent, FormEvent } from 'react';
import { mintNFT } from '../../utils/api';

// Define the NFT data type
interface NFTData {
    content: string;
    name: string;
    description: string;
    symbol: string;
}

const MintPage: React.FC = () => {
    // Initialize state with the NFTData type
    const [nftData, setNftData] = useState<NFTData>({
        content: '',
        name: '',
        description: '',
        symbol: ''
    });

    // Handle input changes with a typed ChangeEvent
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNftData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    // Handle form submission with a typed FormEvent
    const handleMintNFT = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const result = await mintNFT(nftData);
            console.log('NFT Minted:', result);
            // Show success message or update UI with NFT details
        } catch (error) {
            console.error('Minting error:', error);
            // Show error message in the UI
        }
    };

    return (
        <form onSubmit={handleMintNFT}>
            <input
                name="name"
                placeholder="NFT Name"
                value={nftData.name}
                onChange={handleInputChange}
                required
            />
            <input
                name="description"
                placeholder="Description"
                value={nftData.description}
                onChange={handleInputChange}
                required
            />
            <input
                name="symbol"
                placeholder="Symbol"
                value={nftData.symbol}
                onChange={handleInputChange}
                required
            />
            <input
                name="content"
                placeholder="Content"
                value={nftData.content}
                onChange={handleInputChange}
                required
            />
            <button type="submit">Mint NFT</button>
        </form>
    );
};

export default MintPage;
