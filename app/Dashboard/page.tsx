"use client";
import { CarouselSpacing } from "@/components/carousel";
import { ModeToggle } from "@/components/mode-switcher";
import { Chart } from "@/components/reportingChart";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Label } from "@/components/ui/label"
import { useWeatherStore } from "../store/dataStore";
import { useEffect } from "react";
import MapComponent from "@/components/map";
export default function Dashboard() {





    const currentDate = new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(new Date());

    const UserCard = ({ userName }: { userName: string }) => (
        <div className="flex w-full dark:bg-zinc-400/50 bg-gray-400/40 mt-4 rounded-2xl mb-2 p-4">
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col ml-4">
                <Label className="dark:text-zinc-200 text-zinc-600 text-xl">Hi, {userName}</Label>
                <Label className="dark:text-zinc-200 text-zinc-600 text-xs">{currentDate}</Label>
            </div>
            <div className="flex flex-1 justify-end items-center gap-3">
                {/* <ModeToggle /> */}
            </div>
        </div>
    );
    const suggestions = useWeatherStore((state) => state.suggestions);
    const selectedLocation = useWeatherStore((state) => state.selectedLocation);

    const getData = useWeatherStore((state) => state.weatherData) || [];
    useEffect(() => {
        if (getData) console.log("Weather data:", getData);
    }, [getData]);



    // const setSelectedLocation = useWeatherStore((state) => state.setSelectedLocation);
    // const handleSelectLocation = (lat: number, lng: number, name: string) => {
    //   setSelectedLocation({  lat, lng, name });
    // };

    return (
        <div className="py-4 flex gap-4">
            <div id="left-section" className="xl:w-full md:w-full w-full flex flex-col gap-4">
                <div className="flex justify-between gap-2">
                    <div id="general-info" className="flex flex-col w-[60%] h-[19.5em] dark:bg-zinc-800 bg-gray-200 p-8 gap-4 rounded-3xl">
                        <div className="max-h-full overflow-y-auto">
                            <div className="flex flex-1 justify-around items-center">

                                {selectedLocation && getData ?
                                    <>
                                        <Avatar>
                                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col relative ml-4 gap-2 ">
                                            <Label className="flex flex-col relative ml-4 text-4xl">{selectedLocation?.components.city || selectedLocation?.components.town || selectedLocation?.components.state || selectedLocation?.components.county || selectedLocation?.components.village || "N/A"}</Label>

                                            <Label className="flex flex-col relative ml-4 ">{selectedLocation?.components.country}</Label>
                                        </div>
                                        <div className="flex flex-col relative ml-4 gap-2 ">
                                            <Label className="flex  relative ml-4 text-4xl">{getData?.current?.temperature_2m || "N/A"} <span className="text-sm">{getData?.current_units?.apparent_temperature}</span></Label>
                                            <Label className="flex flex-col relative ml-4 ">Temperature</Label>
                                        </div>
                                        <div className="flex flex-col relative ml-4 gap-2 ">
                                            <Label className="flex  relative ml-4 text-4xl">{getData?.current?.wind_speed_10m || "N/A"} <span className="text-sm">{getData?.current_units?.wind_speed_10m}</span></Label>
                                            <Label className="flex flex-col relative ml-4 ">Wind Speed</Label>
                                        </div>
                                        <div className="flex flex-col relative ml-4 gap-2 ">
                                            <Label className="flex  relative ml-4 text-4xl">{getData?.current?.relative_humidity_2m || "N/A"} <span className="text-sm">{getData?.current_units?.relative_humidity_2m}</span></Label>
                                            <Label className="flex flex-col relative ml-4 ">Humidity</Label>
                                        </div>
                                    </>
                                    :
                                    <div className="flex flex-col relative ml-4">

                                    </div>
                                }
                            </div>
                        </div>
                        {selectedLocation && getData ? (
                            <CarouselSpacing data={getData?.hourly?.temperature_2m} time={getData?.hourly?.time} number={12} steps={2} />
                        ) : (
                            <div className="flex flex-col relative ml-4">

                                <CarouselSpacing data={[]} time={[]} number={24} steps={2} />
                            </div>
                        )}
                    </div>

                    <div id="chart-info" className="flex flex-col relative align-middle items-center p-4 w-[40%]  ">
                        <MapComponent />
                    </div>

                </div>

                <div className="flex gap-2">
                    <div id="chart-info" className="flex w-[70%] flex-col dark:bg-zinc-800 bg-gray-200 p-8 gap-4 rounded-3xl">
                        <div className="max-h-full overflow-y-auto">
                            <div className="flex flex-1 justify-start items-center">
                                <div className="flex flex-col relative ml-4">
                                    <Label className="dark:text-zinc-200 text-zinc-600 text-4xl"> Precipitation & Snowfall Levels</Label>
                                </div>
                            </div>
                        </div>

                        <Chart percipitation={getData?.daily?.precipitation_sum} snowfall={getData?.daily?.snowfall_sum} time={getData?.daily?.time} />

                    </div>

                    <div id="chart-info" className="flex  flex-col w-[30%]  dark:bg-zinc-800 bg-gray-200 p-3 gap-4 rounded-3xl">
                        <div className="flex flex-col relative m-2">
                            <Label className="dark:text-zinc-200 text-zinc-600 my-4 text-4xl">Forecast</Label>
                        </div>
                        <div className=" overflow-y-auto h-[19.5em]">
                            <div className="flex flex-1 flex-col justify-start items-center">
                                <UserCard userName="Ahmed" />
                                <UserCard userName="Ahmed" />
                                <UserCard userName="Ahmed" />
                                <UserCard userName="Ahmed" />
                                <UserCard userName="Ahmed" />

                            </div>
                        </div>
                    </div>
                </div>
                <div id="chart-info" className="flex flex-col dark:bg-zinc-800 bg-gray-200 p-8 gap-4 rounded-3xl">
                    {/* <CarouselSpacing steps={4} number={15} /> */}
                </div>
            </div>

        </div>
    );
}
