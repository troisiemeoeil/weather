"use client";
import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "./ui/avatar";
import WeatherCode from "./weatherCode";

export function CarouselSpacing({data,time,number,steps,code}: {data: number[] | undefined; time: string[] | undefined; number: number; steps: number; code: number[] | undefined; }) {

    const getCurrentTime = () => {
        const now = new Date();
        return now.toISOString();
    };


    const formatTime = (isoString: string) => {
        const timePart = isoString.split("T")[1];
        return timePart ? timePart.slice(0, 5) : "N/A";
    };

    // check for time
    if (!time || time.length === 0) {
        return (
            <div className="w-full flex items-center justify-center  text-xl p-4 text-gray-600">
                <span>No forecast data available. Please search for a location.</span>
            </div>
        );
    }

    // check if data exists
    if (!data || data.length === 0) {
        return (
            <div className="w-full flex items-center justify-center p-4 text-gray-600">
                <span>Loading temperature data...</span>
            </div>
        );
    }

    // filter time and data to include only pre defined hours
    const currentTime = getCurrentTime();
    const upcomingItems = time
        .map((t, i) => ({ time: t, temperature: data[i] }))
        .filter((item) => item.time >= currentTime) 
        .slice(1, number); 

    return (
        <Carousel className="w-full  relative">
            <CarouselContent className="-ml-1 backdrop-blur-3xl">
                {upcomingItems.map((item, index) => (
                    <CarouselItem
                        key={index}
                        className="h-full pl-1 basis-1/2 md:basis-1/4 lg:basis-1/8 xl:basis-1/8"
                    >
                        <div className="p-1">
                            <Card className="bg-transparent border-transparent shadow-transparent p-0 m-0">
                                <CardContent className="p-0 h-24   flex flex-col gap-2 bg-sky-200 rounded-[2rem] items-center justify-center">
                                    {/* Display Time */}
                                    <span className="text-sm font-semibold text-zinc-600">
                                        {formatTime(item.time)}
                                    </span>
                                    {/* Avatar */}
                              <WeatherCode weatherCode={code?[index].toString():""} />
                                    {/* Display Temperature */}
                                    <span className="text-sm font-semibold text-zinc-600">
                                        {item.temperature}°C
                                    </span>
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    );
}
