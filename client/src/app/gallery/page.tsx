"use client";

import { GalleryItem, galleryItems } from "@/components/gallery/gallery-item";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Page() {
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
                    />
                </div>

                <Button className="bg-blue-500 hover:bg-blue-500/80">
                    Submit
                </Button>
            </div>
        </div>
    );
}
