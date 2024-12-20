"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useWeatherStore } from "@/app/store/dataStore";
import { Input } from "./ui/input";
import { debounce } from "@/app/libs/debounce";
import { DialogTitle } from "@radix-ui/react-dialog";

export function CommandDialogDemo({ onSelect }: { onSelect: (lat: number, lng: number) => void }) {
  const { suggestions, fetchSuggestions, fetchWeatherByCity, setSelectedLocation, selectedLocation } = useWeatherStore();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const debouncedFetch = useCallback(
    debounce((query: string) => {
      fetchSuggestions(query);
    }, 300),
    []
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    debouncedFetch(value);
  };

  const handleSelectSuggestion = (name: string, lat: number, lng: number) => {
    setQuery(name); // update query with the selected location
    onSelect(lat, lng); // pass the lat and lng to the onSelect function
    setSelectedLocation({ name, lat, lng, components: [] }); // update the selected location
    fetchWeatherByCity(name); // fetch weather for the selected location
    setOpen(false); // close the dialog
    
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "e" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "E" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <div className="text-sm flex align-middle items-center gap-2 dark:border-zinc-500 border-zinc-600 text-muted-foreground">
        <Input type="text" placeholder="Search..." className="cursor-pointer dark:border-zinc-600 border-zinc-600" onSelect={() => setOpen(true)} />
        <kbd className="pointer-events-none hidden xl:inline-flex lg:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground dark:bg-zinc-600 opacity-100">
          <span className="text-xs">⌘</span>E
        </kbd>
      </div>
      <CommandDialog open={open} onOpenChange={setOpen} aria-label="Search City Dialog">
   
      <DialogTitle ></DialogTitle>
        <div className="p-4">
          <Input
            type="text"
            placeholder="Type any location name..."
            value={query}
            onChange={handleInputChange}
            aria-label="City or Country Input"
          />
        </div>
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            {suggestions.map((suggestion, index: number) => (
              <CommandItem
                key={index}
                onClickCapture={() => handleSelectSuggestion(suggestion.name, suggestion.lat, suggestion.lng)}
                // onClick={() => handleSelectSuggestion(suggestion.name, suggestion.lat, suggestion.lng)}
                className="cursor-pointer hover:bg-gray-200"
              >
                {suggestion.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
