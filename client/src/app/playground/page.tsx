"use client";

import { useEffect, useState } from "react";

export default function Page() {
    const [htmlContent, setHtmlContent] = useState("");

    useEffect(() => {
        async function fetchHtml() {
            try {
                const response = await fetch("/og/index.html");
                const html = await response.text();
                setHtmlContent(html);

                const script = document.createElement("script");
                script.src = "/og/main.js";
                script.async = true;
                document.body.appendChild(script);
            } catch (error) {
                console.error("Error fetching HTML file:", error);
            }
        }

        fetchHtml();
    }, []);

    return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
}
