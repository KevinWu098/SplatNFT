"use client";

import React from "react";
import {
    Timeline,
    TimelineConnector,
    TimelineContent,
    TimelineDescription,
    TimelineHeader,
    TimelineIcon,
    TimelineItem,
    TimelineTime,
    TimelineTitle,
} from "@/components/ui/timeline/timeline";

interface TimelineLayoutProps {
    items: TimelineElement[]; // Replace any[] with the actual type of items.
}
export const TimelineLayout = ({ items }: TimelineLayoutProps) => {
    return (
        <Timeline>
            <TimelineItem>
                <TimelineConnector />
                <TimelineHeader>
                    <TimelineTime>{items[0].date}</TimelineTime>
                    <TimelineIcon />
                    <TimelineTitle>{items[0].title}</TimelineTitle>
                </TimelineHeader>
                <TimelineContent>
                    <TimelineDescription>
                        {items[0].description}
                    </TimelineDescription>
                </TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelineConnector />
                <TimelineHeader>
                    <TimelineTime>{items[1].date}</TimelineTime>
                    <TimelineIcon />
                    <TimelineTitle>{items[1].title}</TimelineTitle>
                </TimelineHeader>
                <TimelineContent>
                    <TimelineDescription>
                        {items[1].description}
                    </TimelineDescription>
                </TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelineHeader>
                    <TimelineTime>{items[2].date}</TimelineTime>
                    <TimelineIcon />
                    <TimelineTitle>{items[2].title}</TimelineTitle>
                </TimelineHeader>
                <TimelineContent>
                    <TimelineDescription>
                        {items[2].description}
                    </TimelineDescription>
                </TimelineContent>
            </TimelineItem>
        </Timeline>
    );
};

export const timelineData = [
    {
        id: 1,
        title: "First event",
        date: "01/01/24",
        description: "Lorem ipsum dolor sit amet.",
    },
    {
        id: 2,
        title: "Second event",
        date: "02/01/24",
        description: "Aut eius excepturi ex.",
    },
    {
        id: 3,
        title: "Third event",
        date: "03/01/24",
        description: "Sit culpa quas ex nulla.",
    },
];

export type TimelineData = (typeof timelineData)[number];

export interface TimelineElement {
    id: number;
    title: string;
    date: string;
    description: string;
}
