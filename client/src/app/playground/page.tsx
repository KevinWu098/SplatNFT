"use client";

import { useRenderer } from "@/hooks/use-renderer";

export default function Page() {
    const { renderer } = useRenderer();

    return <div dangerouslySetInnerHTML={{ __html: renderer }} />;
}
