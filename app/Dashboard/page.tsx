"use client";
import { CarouselSpacing } from "@/components/carousel";
import { Chart } from "@/components/reportingChart";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { useWeatherStore } from "../store/dataStore";
import { useEffect } from "react";
import MapComponent from "@/components/map";
import { ScrollArea } from "@/components/ui/scroll-area";
import WeatherCode from "@/components/weatherCode";
export default function Dashboard() {


    const selectedLocation = useWeatherStore((state) => state.selectedLocation);

    const getData = useWeatherStore((state) => state.weatherData) || [];
    useEffect(() => {
        if (getData) console.log("Weather data:", getData);
    }, [getData]);

    const ForecastByDayCard = ({ tempMax, tempMin, day, code }: { tempMax: number, tempMin: number, day: string, code: string }) => (
        <div className="flex w-full items-center dark:bg-zinc-400/50 bg-gray-400/40 mt-4 rounded-2xl mb-2 p-4">
            <WeatherCode style="text-4xl" weatherCode={code} />
            <div className="flex w-full ml-4">
          <div className="container">
          <Label className="dark:text-zinc-200 text-zinc-600 text-2xl font-medium"> {tempMin}°C </Label>
                <Label className="dark:text-zinc-200 text-zinc-600 text-xs">/ {tempMax}°C</Label>

          </div>
                <Label className="dark:text-zinc-200 text-zinc-600 text-base mr-1">{day.slice(8, 10)}</Label>
                <Label className="dark:text-zinc-200 text-zinc-600 text-xs">{new Intl.DateTimeFormat("en-US", {
    
        month: "long",
    }).format(new Date()).slice(0, 3)}</Label>

            </div>
            <div className="flex flex-1 justify-end items-center gap-3">
            </div>
        </div>
    );





    return (
        <div className="py-4 flex flex-col items-center align-middle justify-center gap-4">
            <div id="left-section" className="xl:w-full md:w-full w-full flex flex-col xl:gap-4 lg:gap-4 md:gap-4 gap-14">
                <div className=" flex flex-col justify-between xl:flex-row lg:flex-row md:flex-row gap-2 PB-8  xl:p-0 lg:p-0 md:p-0">

              

                    <div id="general-info" className="flex flex-col overflow-y-hidden xl:w-[60%] lg:w-[60%] md:w-[60%] w-full h-full dark:bg-zinc-800 bg-gray-200 p-8 gap-4 rounded-3xl">
                        <div className="max-h-full overflow-y-auto">
                            <div className="flex flex-1 justify-around items-center">

                                {selectedLocation && getData ?
                                    <>
                                    <WeatherCode style={"text-4xl"}  weatherCode={getData?.hourly?.weather_code[0]} />
                                        <div className="flex flex-col relative gap-2 ">
                                            <Label className="flex flex-col relative  text-4xl">{selectedLocation?.components.city || selectedLocation?.components.town || selectedLocation?.components.state || selectedLocation?.components.county || selectedLocation?.components.village || "N/A"}</Label>

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
                            <CarouselSpacing data={getData?.hourly?.temperature_2m} time={getData?.hourly?.time} code={getData?.hourly?.weather_code} number={11} steps={2} />
                        ) : (
                            <div className="flex flex-col relative ml-4">

                                <CarouselSpacing code={[]} data={[]} time={[]} number={24} steps={2} />
                            </div>
                        )}
                    </div>
                    <div id="Map-info" className="flex flex-col relative  align-middle items-center container  xl:w-[40%] lg:w-[40%] md:w-[40%] w-full  h-[35vh]  ">
                        <MapComponent />
                    </div>
         
                </div>

                <div className="flex flex-col relative justify-between xl:flex-row lg:flex-row md:flex-row gap-2 h-[40vh] pb-10 xl:p-0 lg:p-0 md:p-0">
                    <div id="forecast-info" className="flex flex-col xl:w-[30%] lg:w-[30%] md:w-[30%] w-full h-full dark:bg-zinc-800 bg-gray-200 p-4  rounded-3xl">
                        <div className="flex flex-col relative">
                            <Label className="dark:text-zinc-200 text-zinc-600 px-4 font-semibold text-2xl">Forecast</Label>
                        </div>
                        <div className=" overflow-y-auto h-full">
                            <ScrollArea className="flex flex-1 flex-col justify-start items-center rounded-md border p-2">
                                {getData?.daily?.temperature_2m_min && getData?.daily?.time ? (
                                    getData.daily.temperature_2m_min.slice(0, 7).map((temp: number,  index : number) => (
                                        <ForecastByDayCard
                                            key={index}
                                            tempMax={getData.daily.temperature_2m_max[index]}
                                            tempMin={temp}
                                            code={getData.daily.weather_code[index]}
                                            day={getData.daily.time[index]}
                                        />
                                    ))
                                ) : (
                                    <div className="flex flex-1 flex-col justify-center align-middle text-gray-600  rounded-md border p-2">
                                        No forecast data available. Please search for a location.
                                    </div>
                                )}
                            </ScrollArea>

                        </div>
                    </div>
                    <div id="chart-info" className="flex flex-col items-center align-middle justify-center container  xl:w-[70%] lg:w-[70%] md:w-[70%] w-full">
                        <Chart percipitation={getData?.daily?.precipitation_sum} snowfall={getData?.daily?.snowfall_sum} time={getData?.daily?.time} />

                    </div>


                </div>

            </div>
            {/* <div className="flex flex-col justify-between xl:flex-row lg:flex-row md:flex-row gap-">

                <footer className="dark:text-zinc-200 text-zinc-600 text-sm  w-full">Made by Ahmed Boulakhras</footer>
            </div> */}

        </div>
    );
}
