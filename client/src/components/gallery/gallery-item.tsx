import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ImageIcon } from "lucide-react";

type GalleryItem = {
    id: number;
    src: string;
    name: string;
    description: string;
};

interface GalleryItemProps {
    item: GalleryItem;
}

export function GalleryItem({ item }: GalleryItemProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link
            href={`/dashboard?url=${item.src.slice(1).split(".")[0]}.splat`}
            prefetch={false}
        >
            <motion.div
                className="relative cursor-pointer overflow-hidden rounded-lg border-2 border-neutral-200 shadow-lg shadow-blue-100"
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={item.src}
                    alt={item.name}
                    className="h-56 w-full object-cover"
                />
                <motion.div
                    className="absolute inset-0 flex flex-col justify-end bg-black bg-opacity-60 p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <motion.h2
                        className="text-xl font-semibold text-white"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{
                            y: isHovered ? 0 : 20,
                            opacity: isHovered ? 1 : 0,
                        }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                    >
                        {item.name}
                    </motion.h2>
                    <motion.p
                        className="text-sm text-gray-200"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{
                            y: isHovered ? 0 : 20,
                            opacity: isHovered ? 1 : 0,
                        }}
                        transition={{ duration: 0.3, delay: 0.15 }}
                    >
                        {item.description}
                    </motion.p>
                </motion.div>
                <motion.div
                    className="absolute right-4 top-4 rounded-full bg-white p-2"
                    initial={{ scale: 0 }}
                    animate={{ scale: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <ImageIcon className="h-5 w-5 text-gray-800" />
                </motion.div>
            </motion.div>
        </Link>
    );
}

export const galleryItems: GalleryItem[] = [
    {
        id: 1,
        src: "/train.png",
        name: "Western Pacific Train",
        description:
            "A Gaussian Splat of a Western Pacific train in the train yard",
    },
    {
        id: 2,
        src: "/table.png",
        name: "Hard at Work",
        description: "The SplatNFT team devving >:)",
    },
    // {
    //     id: 2,
    //     src: "/jas.png",
    //     name: "Saluting at Sunset",
    //     description: "A girl saluting in the park at sunset",
    // },
    {
        id: 3,
        src: "/bonsai.png",
        name: "Lego Bonsai",
        description: "A room with a Lego Bonsai tree at the center",
    },
    {
        id: 4,
        src: "/nc.png",
        name: "Natural Disaster Strikes",
        description: "The aftermath of a natural disaster",
    },
    {
        id: 5,
        src: "/lia.png",
        name: "Teammate Lia",
        description: "It's Lia!",
    },
];
