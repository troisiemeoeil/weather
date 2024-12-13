"use client"
import { ModeToggle } from "@/components/mode-switcher";
import { CommandDialogDemo } from "@/components/search";
import { Label } from "@/components/ui/label"
import { GoogleGenerativeAI } from "@google/generative-ai";
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
    const setSelectedLocation = useWeatherStore((state) => state.setSelectedLocation);
    const handleLocationSelect = (lat: number, lng: number) => {
        // setSelectedLocation({ , lat, lng });
        console.log("Selected location:", { lat, lng });
    };
    const [userName, setUserName] = useState("");
    const [locationName, setLocationName] = useState("");


    useEffect(() => {
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

    const selectedLocation = useWeatherStore((state) => state.selectedLocation);

    
    
    useEffect(() => {
        if (selectedLocation) {
            console.log(selectedLocation);
            
            setLocationName(selectedLocation?.components?.city || selectedLocation?.components?.country || selectedLocation?.components?.state || selectedLocation?.components?.region  || ""); 
        }
    }, [selectedLocation]);


    async function handleRequest() {
        if(locationName === "") {
            alert("Please select a location first");
            return;
        }
        const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_KEY || "");
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `You're a tourist guide expert, give me a description of the city of ${locationName} 
        and what kind of tourist attractions it has. Give me some interesting facts about it and some useful statistics. Make it no more than 150 words.`;

        const result = await model.generateContent(prompt);
        console.log(result.response.text());
    }


    return (
        <header className="flex dark:bg-zinc-800 bg-gray-200 mt-4 rounded-full p-4">
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col ml-4 ">
                <Label className="dark:text-zinc-200 text-zinc-600  text-xl">Hi, {userName} </Label>
                <Label className="dark:text-zinc-200 text-zinc-600 text-xs">
                    {new Intl.DateTimeFormat("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }).format(new Date())}
                </Label>

            </div>

            <div className="flex flex-1 justify-end items-center gap-3">
                <CommandDialogDemo onSelect={handleLocationSelect} />
                <ModeToggle />
     
                {locationName ? (
                <DrawerBox />
                ) : (
                    <Button disabled>Enter your own location</Button>
                )}
            </div>

        </header>
    );
}
