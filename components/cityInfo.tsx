"use client"

import * as React from "react"
import { useState, useEffect } from "react";
import { Minus, Plus, RotateCcw, X } from "lucide-react"
import { Bar, BarChart, ResponsiveContainer } from "recharts"
import { GoogleGenerativeAI } from "@google/generative-ai";

import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { useWeatherStore } from "@/app/store/dataStore";


export function DrawerBox() {
    const [locationName, setLocationName] = useState("");

    const selectedLocation = useWeatherStore((state) => state.selectedLocation);
    const [result, setResult] = useState("");

    useEffect(() => {
        if (selectedLocation) {
            console.log(selectedLocation);
            setLocationName(selectedLocation?.name || selectedLocation?.components?.city || selectedLocation?.components?.region || selectedLocation?.components?.state || selectedLocation?.components?.country || "");
        }
    }, [selectedLocation]);


    async function handleRequest() {
            try {
                if (locationName === "") {
                    alert("Please select a location first");
                    return;
                }
                const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI || "");
                const model = genAI.getGenerativeModel({ model: "gemini-exp-1114" });
                
                const prompt = `You're a tourist guide expert, give me a description of the city of ${locationName} 
                and what kind of tourist attractions it has. Give me some interesting and fun facts about it and some useful statistics. 
                Generate it as html, just give me what's inside the <body> tag. follow this example: 
                <body>
                    <h1>Monastir: A Tunisian Gem</h1>
                    <p>Monastir, a coastal city in Tunisia, boasts a rich history and stunning beaches.  Explore the Ribat, a 8th-century fortress offering panoramic views, and the Mausoleum of Habib Bourguiba, the first president of Tunisia.  Enjoy the vibrant marina, relax on the sandy shores, or delve into the bustling souks. </p>
                    <br />
                    <p><b>Interesting Fact:</b> Monastir was a significant base for the Barbary pirates.</p>
                    
                    <p><b>Fun Fact:</b> Monastir has a cool festival called the "Festival of the Sun".</p>
                    
                    <p><b>Statistics (approx.):</b>  <br /> Population: ~100,000;
                    <br />
                    <p><b>Area: (approx.):</b> ~1,000 square kilometers;
                    
                    <p><b>Average annual temperature: (approx.):</b> 19°C;
                     <br />
                    <p><b>Attractions:</b> Ribat, Mausoleum of Bourguiba, beaches, marina, souks.</p>
                </body>
        
                Remove the <body> tags and give me only what was inside of it.
                Make it no more than 150 words.`;
        
                const result = await model.generateContent(prompt);
                setResult(result.response.text());
                console.log(result.response.text());
            } catch (error) {
                alert(error);
            }
    }
    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button variant="outline" onClick={handleRequest}>Explore {locationName}</Button>


            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-xl">
                    <DrawerHeader>
                        <div className="flex justify-between items-center">
                            <DrawerTitle>Explore {locationName}</DrawerTitle>
                            <Button variant="outline" onClick={handleRequest}><RotateCcw /></Button>
                        </div>
                        <DrawerDescription>Learn about the fantastic:  {locationName}</DrawerDescription>
                    </DrawerHeader>
                    <div className="grid gap-2 p-4">
                        {result ? (
                            <div dangerouslySetInnerHTML={{ __html: result }} />
                        ) : (
                            <div className="w-full flex items-center justify-center text-sm p-4 text-gray-500">
                                We're working on it, this might take a few seconds...
                            </div>
                        )}
                    </div>

                </div>
            </DrawerContent>
        </Drawer>
    )
}
