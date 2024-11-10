import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { cameras } from "@/components/renderer/constants";
import {
    getProjectionMatrix,
    getViewMatrix,
} from "@/components/renderer/utils";

import styles from "./WebGLViewer.module.css"; // Import your CSS module

export function SplatRenderer() {
    const canvasRef = useRef(null);
    const [fps, setFps] = useState(0);
    const [camId, setCamId] = useState("");
    const [message, setMessage] = useState("");
    const [carousel, setCarousel] = useState(true);
    const [viewMatrix, setViewMatrix] = useState<number[]>();
    const [projectionMatrix, setProjectionMatrix] = useState(null);
    const [camera, setCamera] = useState(cameras[0]);
    const [vertexCount, setVertexCount] = useState(0);
    const fpsRef = useRef(0);

    const camIdRef = useRef<HTMLSpanElement>(null);
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== "undefined") {
            const main = async () => {
                // Initialize variables
                let carouselActive = true;
                let currentCamera = cameras[0];
                let viewMat = getViewMatrix(currentCamera);
                let projMat;
                let lastFrameTime = 0;
                let avgFps = 0;
                let startTime = Date.now();
                let vertexCnt = 0;

                // Fetch data
                const params = new URLSearchParams(window.location.search);
                try {
                    const hashViewMatrix = JSON.parse(
                        decodeURIComponent(window.location.hash.slice(1))
                    );
                    viewMat = hashViewMatrix;
                    carouselActive = false;
                } catch (err) {}

                const url = new URL(
                    params.get("url") || "train.splat",
                    "https://huggingface.co/cakewalk/splat-data/resolve/main/"
                );
                const response = await fetch(url, {
                    mode: "cors",
                    credentials: "omit",
                });

                if (response.status !== 200) {
                    throw new Error(
                        `${response.status} Unable to load ${response.url}`
                    );
                }

                // Set up WebGL
                const canvas = canvasRef.current;
                const gl = canvas.getContext("webgl2", { antialias: false });

                // ... (set up shaders, buffers, textures)

                // Handle resizing
                const resizeCanvas = () => {
                    // Update projection matrix and viewport
                    projMat = getProjectionMatrix(
                        currentCamera.fx,
                        currentCamera.fy,
                        window.innerWidth,
                        window.innerHeight
                    );
                    setProjectionMatrix(projMat);

                    canvas.width = window.innerWidth;
                    canvas.height = window.innerHeight;
                    gl.viewport(0, 0, canvas.width, canvas.height);

                    // Update uniforms
                    // gl.uniformMatrix4fv(u_projection, false, projMat);
                };

                window.addEventListener("resize", resizeCanvas);
                resizeCanvas();

                // Animation loop
                const animate = (now) => {
                    // Calculate FPS
                    const currentFps = 1000 / (now - lastFrameTime) || 0;
                    avgFps = avgFps * 0.9 + currentFps * 0.1;
                    setFps(Math.round(avgFps));
                    lastFrameTime = now;

                    // Update view matrix if carousel is active
                    if (carouselActive) {
                        // ... (update view matrix for carousel)
                    }

                    // Render
                    if (vertexCnt > 0) {
                        // ... (render your scene)
                    }

                    requestAnimationFrame(animate);
                };

                requestAnimationFrame(animate);

                // Clean up on unmount
                return () => {
                    window.removeEventListener("resize", resizeCanvas);
                    // ... (remove other event listeners and clean up)
                };
            };

            main().catch((err) => {
                setMessage(err.toString());
            });
        }
    }, []);

    const [activeKeys, setActiveKeys] = useState<string[]>([]);
    const [currentCameraIndex, setCurrentCameraIndex] = useState(0);

    // Handle keyboard and mouse events
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            setCarousel(false);

            if (!activeKeys.includes(e.code)) activeKeys.push(e.code);

            if (/\d/.test(e.key)) {
                setCurrentCameraIndex(parseInt(e.key));
                setCamera(cameras[currentCameraIndex]);
                setViewMatrix(getViewMatrix(camera));
            }

            if (["-", "_"].includes(e.key)) {
                setCurrentCameraIndex(
                    (currentCameraIndex + cameras.length - 1) % cameras.length
                );

                setViewMatrix(getViewMatrix(cameras[currentCameraIndex]));
            }

            if (["+", "="].includes(e.key)) {
                setCurrentCameraIndex(
                    (currentCameraIndex + 1) % cameras.length
                );
                setViewMatrix(getViewMatrix(cameras[currentCameraIndex]));
            }

            if (camIdRef.current) {
                camIdRef.current.innerText = "cam  " + currentCameraIndex;
            }

            if (e.code == "KeyV") {
                location.hash =
                    "#" +
                    JSON.stringify(
                        viewMatrix?.map((k) => Math.round(k * 100) / 100)
                    );

                if (camIdRef.current?.innerText) {
                    camIdRef.current.innerText = "";
                }
            } else if (e.code === "KeyP") {
                setCarousel(true);

                if (camIdRef.current?.innerText) {
                    camIdRef.current.innerText = "";
                }
            }
        };

        const handleKeyUp = (e) => {
            // ... (handle keyup events)
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        // Clean up
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, []);

    // ... (include other useEffects for mousemove, touch events, etc.)

    return (
        <div>
            <div
                id="info"
                className={styles.info}
            >
                <h3 className={`${styles.nohf}`}>
                    WebGL 3D Gaussian Splat Viewer
                </h3>
                <p>
                    <small className={`${styles.nohf}`}>
                        By{" "}
                        <a href="https://twitter.com/antimatter15">
                            Kevin Kwok
                        </a>
                        . Code on{" "}
                        <a href="https://github.com/antimatter15/splat">
                            Github
                        </a>
                        .
                    </small>
                </p>
                <details>
                    <summary>Use mouse or arrow keys to navigate.</summary>
                    <div
                        id="instructions"
                        className={styles.instructions}
                    >
                        {/* Include your instructions here */}
                    </div>
                </details>
            </div>
            <div
                id="progress"
                className={styles.progress}
            ></div>
            <div
                id="message"
                className={styles.message}
            >
                {message}
            </div>
            <div
                className={`${styles.scene} ${styles.spinner}`}
                id="spinner"
            >
                {/* Cube Spinner */}
                <div className={styles["cube-wrapper"]}>
                    <div className={styles.cube}>
                        <div className={styles["cube-faces"]}>
                            <div
                                className={`${styles["cube-face"]} ${styles.bottom}`}
                            ></div>
                            <div
                                className={`${styles["cube-face"]} ${styles.top}`}
                            ></div>
                            <div
                                className={`${styles["cube-face"]} ${styles.left}`}
                            ></div>
                            <div
                                className={`${styles["cube-face"]} ${styles.right}`}
                            ></div>
                            <div
                                className={`${styles["cube-face"]} ${styles.back}`}
                            ></div>
                            <div
                                className={`${styles["cube-face"]} ${styles.front}`}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
            <canvas
                id="canvas"
                ref={canvasRef}
                className={styles.canvas}
            ></canvas>
            <div
                id="quality"
                className={styles.quality}
            >
                <span id="fps">{fps} fps</span>
            </div>
            <div
                id="caminfo"
                className={styles.caminfo}
            >
                <span
                    id="camid"
                    ref={camIdRef}
                >
                    {camId}
                </span>
            </div>
        </div>
    );
}
