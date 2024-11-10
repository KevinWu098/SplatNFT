"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    timelineData,
    TimelineLayout,
} from "@/components/ui/timeline/timeline-layout";
import {
    ApertureIcon,
    FileAxis3DIcon,
    GripIcon,
    InfoIcon,
    ProportionsIcon,
    UserIcon,
} from "lucide-react";

export function Panel() {
    return (
        <div className="absolute z-50 m-4 h-[calc(100dvh-32px)] w-[350px] space-y-4 rounded-lg bg-white p-4">
            <div className="flex items-center space-x-2">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-blue-500 text-sidebar-primary-foreground">
                    <ApertureIcon className="size-4" />
                </div>

                <div className="flex flex-col gap-0.5 leading-none">
                    <span className="text-3xl font-semibold">SplatNFT</span>
                </div>
            </div>

            <Tabs defaultValue="info">
                <TabsList className="w-full">
                    <TabsTrigger
                        value="info"
                        className="w-1/2"
                    >
                        Info
                    </TabsTrigger>
                    <TabsTrigger
                        value="history"
                        className="w-1/2"
                    >
                        History
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="info">
                    <div className="space-y-2">
                        <div className="space-y-1 rounded-lg border bg-neutral-100 p-4 shadow-inner shadow-blue-100">
                            <p className="text-lg font-bold">NFT Details</p>
                            <div className="flex items-center space-x-2">
                                <InfoIcon className="size-4" />
                                <p className="text-base">Name: foo</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <UserIcon className="size-4" />
                                <p className="text-base">Owner: bar</p>
                            </div>
                        </div>
                        <div className="space-y-1 rounded-lg border bg-neutral-100 p-4 shadow-inner shadow-blue-100">
                            <p className="text-lg font-bold">Splat Details</p>
                            <div className="flex items-center space-x-2">
                                <GripIcon className="size-4" />
                                <p className="text-base">Points: 1,234,567</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <ProportionsIcon className="size-4" />
                                <p className="text-base">
                                    Resolution: 420 x 420
                                </p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <FileAxis3DIcon className="size-4" />
                                <p className="text-base">Size: 42 MB</p>
                            </div>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="history">
                    <div className="space-y-2">
                        <div className="ml-12">
                            <TimelineLayout items={timelineData} />
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
