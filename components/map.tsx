import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { useWeatherStore } from "@/app/store/dataStore";

// Set your Mapbox access token
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "YOUR_MAPBOX_ACCESS_TOKEN";

const MapComponent = () => {
  const { selectedLocation } = useWeatherStore((state) => state);
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (map.current) return; // Initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: "mapbox://styles/lewwy/cm4kvckkj00c301r09g3ahddq",
      center: [-74.5, 40], // Default center
      zoom: 9, // Default zoom level
    });

  }, [map.current]);

  useEffect(() => {
    if (selectedLocation && map.current) {
      map.current.flyTo({
        center: [selectedLocation.lng, selectedLocation.lat],
        essential: true,
        zoom: 10,
      });
  

    }
    
  }, [selectedLocation]);

  return <div ref={mapContainer} className="w-[100%] h-[100%] absolute top-0 left-0  rounded-md" />;
};

export default MapComponent;
