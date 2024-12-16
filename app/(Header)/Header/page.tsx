"use client"
import { ModeToggle } from "@/components/mode-switcher";
import { CommandDialogDemo } from "@/components/search";
import { Label } from "@/components/ui/label"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { useWeatherStore } from "@/app/store/dataStore";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { DrawerBox } from "@/components/cityInfo";
export default function Header() {

    
    const handleLocationSelect = (lat: number, lng: number) => {
        console.log("Selected location:", { lat, lng });
    };


    const [userName, setUserName] = useState("");
    const [locationName, setLocationName] = useState("");


    useEffect(() => {
        //get the user name and store it in local storage
        const username = window.localStorage.getItem("userName");

        if (!username) {
            const newUserName = prompt("Please enter your name:", "Your Name");
            if (newUserName && newUserName.trim()) {
                setUserName(newUserName.trim());
                window.localStorage.setItem("userName", newUserName.trim());
            } else {
                setUserName("Joe Doe");
            }
        } else {
            setUserName(username);
        }

    }, []);
    // get the selected location from the useWeatherStore
    const selectedLocation = useWeatherStore((state) => state.selectedLocation);


    // check the existence of selectedLocation and update locationName state
    useEffect(() => {
        if (selectedLocation) {
            console.log(selectedLocation);

            setLocationName(selectedLocation?.components?.city || selectedLocation?.components?.country || selectedLocation?.components?.state || selectedLocation?.components?.region || "");
        }
    }, [selectedLocation]);


    return (
        <header className="flex xl:flex-row lg:flex-row md:flex-row items-center flex-col gap-2 dark:bg-zinc-800 bg-gray-200 mt-4 xl:rounded-full lg:rounded-full md:rounded-full rounded-3xl p-4">
            <div className="flex  items-center justify-between xl:w-[90%] lg:w-[90%] md:w-[90%] w-full">
                <div className="flex items-center">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col ml-4 ">
                        <Label className="dark:text-zinc-200 text-zinc-600  text-xl">Hi, {userName} </Label>
                        <Label className="dark:text-zinc-200 text-zinc-600 text-xs hidden xl:inline-flex lg:inline-flex">
                            {new Intl.DateTimeFormat("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }).format(new Date())}
                        </Label>

                    </div>
                </div>


                <div className="flex items-center gap-1">
                    <CommandDialogDemo onSelect={handleLocationSelect} />
                    <ModeToggle />
                </div>
            </div>

            <div className="flex justify-end items-center gap-3 ">


                {locationName ? (
                    <DrawerBox />
                ) : (
                    <div className="cursor-not-allowed">

                        <Button className="xl:w-[15vw] lg:w-[15vw] md:w-[15vw] w-[15rem] " disabled>Explore a city</Button>
                    </div>
                )}
            </div>

        </header>
    );
}
