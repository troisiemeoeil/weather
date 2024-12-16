import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { useWeatherStore } from "@/app/store/dataStore";
import { useThemeStore } from "@/app/store/themeStore";

// Set your Mapbox access token
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "YOUR_MAPBOX_ACCESS_TOKEN";

const MapComponent = () => {
  const { selectedLocation } = useWeatherStore((state) => state);
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const { state } = useThemeStore();
  const darkMap = "mapbox://styles/lewwy/cm4kvckkj00c301r09g3ahddq"
  const lightMap = "mapbox://styles/lewwy/cm4mrxxqe003o01sf0z2idxjf"


  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: state === "dark" ? darkMap : lightMap,
      center: selectedLocation ? [selectedLocation.lng, selectedLocation.lat] : [23.123988, 63.852931],
      zoom: 9, 
    });

  
  }, [state]);

  useEffect(() => {
    if (selectedLocation && map.current) {
      map.current.flyTo({
        center: [selectedLocation.lng, selectedLocation.lat],
        essential: true,
        zoom: 10,
      });
   

    }

  }, [selectedLocation]);

  return <div ref={mapContainer} className="w-[100%] h-full   m-18  absolute top-0 left-0  rounded-md" />;
};

export default MapComponent;
