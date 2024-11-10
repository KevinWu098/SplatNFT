import { useState } from "react";
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
                className="h-64 w-full object-cover"
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
    );
}

export const galleryItems: GalleryItem[] = [
    {
        id: 1,
        src: "/placeholder.svg?height=300&width=400",
        name: "Serene Lake",
        description: "A peaceful mountain lake at sunset",
    },
    {
        id: 2,
        src: "/placeholder.svg?height=300&width=400",
        name: "Urban Jungle",
        description: "Skyscrapers reaching for the sky",
    },
    {
        id: 3,
        src: "/placeholder.svg?height=300&width=400",
        name: "Autumn Path",
        description: "A winding path through fall foliage",
    },
    {
        id: 4,
        src: "/placeholder.svg?height=300&width=400",
        name: "Coastal Cliffs",
        description: "Rugged cliffs meeting the ocean",
    },
    {
        id: 5,
        src: "/placeholder.svg?height=300&width=400",
        name: "Desert Dunes",
        description: "Golden sand dunes at dawn",
    },
    {
        id: 6,
        src: "/placeholder.svg?height=300&width=400",
        name: "Tropical Paradise",
        description: "Crystal clear waters and palm trees",
    },
];
