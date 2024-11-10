"use client";

import { useState } from "react";
import { GalleryItem, galleryItems } from "@/components/gallery/gallery-item";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Page() {
    const [videoFile, setVideoFile] = useState<File>();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        setVideoFile(file);
    };

    async function mintNFT(videoFile: File) {
        const formData = new FormData();
        formData.append("video", videoFile);

        try {
            // Make the fetch request
            const response = await fetch(
                "https://58171d214b13.ngrok.app/mint-nft ",
                {
                    method: "POST",
                    body: formData, // Attach the form data
                }
            );

            // Parse the response
            const result = await response.json();
            console.log("NFT Minting Response:", result);

            // Handle success or errors
            if (response.ok) {
                console.log("NFT minted successfully!");
            } else {
                console.error("Error minting NFT:", result);
            }
        } catch (error) {
            console.error("Request failed:", error);
        }
    }

    const handleClick = () => {
        if (videoFile) {
            mintNFT(videoFile);
        } else {
            console.error("No video file selected");
        }
    };

    return (
        <div className="flex min-h-screen flex-col bg-black p-4">
            <div className="flex-grow rounded-lg bg-white p-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {galleryItems.map((item) => (
                        <GalleryItem
                            key={item.id}
                            item={item}
                        />
                    ))}
                </div>
            </div>

            <div className="absolute bottom-12 left-1/2 flex -translate-x-[50%] items-end space-x-2">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="picture">Upload Video</Label>
                    <Input
                        id="picture"
                        type="file"
                        onChange={handleFileChange}
                    />
                </div>

                <Button
                    className="bg-blue-500 hover:bg-blue-500/80"
                    onClick={handleClick}
                >
                    Submit
                </Button>
            </div>
        </div>
    );
}
