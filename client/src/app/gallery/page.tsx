"use client";

import { useState } from "react";
import { GalleryItem, galleryItems } from "@/components/gallery/gallery-item";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import JSZip from "jszip";

export default function Page() {
    const [videoFile, setVideoFile] = useState<File>();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        setVideoFile(file);
    };

    async function mintNFT(videoFile: File) {
        // const testResponse = await fetch(
        //     `https://58171d214b13.ngrok.app/test`,
        //     {
        //         method: "GET",
        //     }
        // );

        // const testResult = await testResponse.json();
        // console.log("test result", testResult);

        // const testNftResponse = await fetch(
        //     `https://58171d214b13.ngrok.app/download-nft/${testResult.ipfsCid}`,
        //     {
        //         method: "GET",
        //     }
        // );

        // const blob = await testNftResponse.blob();

        // // Create a JSZip instance and load the Blob
        // const zip = new JSZip();
        // const zipContents = await zip.loadAsync(blob);

        // // Iterate over the files in the ZIP and extract their content
        // for (const fileName in zipContents.files) {
        //     const file = zipContents.files[fileName];

        //     if (!file.dir) {
        //         // If it's not a directory
        //         const content = await file.async("string"); // Or "blob"/"arraybuffer" if needed
        //         console.log(`File: ${fileName}, Content: ${content}`);
        //     }
        // }

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
                try {
                    const nftResponse = await fetch(
                        `https://58171d214b13.ngrok.app/download-nft/${result.ipfsCid}`,
                        {
                            method: "GET",
                        }
                    );

                    const nftResult = await nftResponse.json();

                    console.log("nft result", nftResult);
                } catch (e) {
                    console.log("get minted nft failed:", e);
                }
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
