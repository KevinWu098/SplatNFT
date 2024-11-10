import { useEffect, useState } from "react";

export function useRenderer() {
    const [htmlContent, setHtmlContent] = useState("");

    useEffect(() => {
        async function fetchHtml() {
            try {
                const response = await fetch("/og/index.html");
                if (!response.ok) {
                    throw new Error("Failed to fetch HTML content");
                }

                const html = await response.text();
                setHtmlContent(html);

                const script = document.createElement("script");
                script.src = "/og/main.js";
                script.async = true;
                document.body.appendChild(script);

                return () => {
                    document.body.removeChild(script);
                };
            } catch (error) {
                console.error("Error fetching HTML file:", error);
            }
        }

        fetchHtml();
    }, []);

    return { renderer: htmlContent };
}
