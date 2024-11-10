"use client";

import { useRenderer } from "@/hooks/use-renderer";

export function Renderer() {
    const { renderer } = useRenderer();

    return <div dangerouslySetInnerHTML={{ __html: renderer }} />;
}
