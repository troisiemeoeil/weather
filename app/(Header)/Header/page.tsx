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
export default function Header() {
    const setSelectedLocation = useWeatherStore((state) => state.setSelectedLocation);
    const handleLocationSelect = (lat: number, lng: number) => {
        // setSelectedLocation({ , lat, lng });
        console.log("Selected location:", { lat, lng });
      };
    const [userName, setUserName] = useState("");
    useEffect(() => {
        // creating a local storage bucket
        const username = window.localStorage.getItem("userName");
    
        if (!username) {
          const newUserName = prompt("Please enter your name:", "Your Name");
          if (newUserName && newUserName.trim()) {
            setUserName(newUserName.trim());
            window.localStorage.setItem("userName", newUserName.trim()); // storing the name to local storage
          } else {
            setUserName("Guest"); // Default name if input is empty or cancelled
          }
        } else {
          setUserName(username);
        }
      }, []); // Run only once on initial render
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
            </div>
                
        </header>
    );
}
