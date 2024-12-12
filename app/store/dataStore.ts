import { create } from "zustand";
import axios from "axios";
import { time } from "console";


interface LocationComponents {
    city?: string;
    [key: string]: any;
  }

interface Location {
    name: string;
    lat: number;
    lng: number;
    components: LocationComponents;
}

interface WeatherState {
    name: string | null;
    weatherData: any; // You can replace this with a specific type for weather data if available
    loading: boolean;
    error: string | null;
    suggestions: Array<Location>;
    selectedLocation: Location | null;
    mapState: boolean | null;
    fetchSuggestions: (query: string) => Promise<void>;
    fetchWeatherByCity: (city: string) => Promise<void>;
    setSelectedLocation: (location: Location  | null) => void;
}

const OPEN_CAGE_API_KEY = process.env.NEXT_PUBLIC_OPEN_CAGE_API_KEY;
const OPEN_CAGE_URL = process.env.NEXT_PUBLIC_OPEN_CAGE_URL;

export const useWeatherStore = create<WeatherState>((set) => ({
    name: null,
    weatherData:  null,
    loading: false,
    error: null,
    selectedLocation: null,
    mapState: false,
    suggestions: [],
    components: [],

    // Update selected location in state
    setSelectedLocation: (location) => set({ selectedLocation: location }),

    // Fetch suggestions for city or country names
    fetchSuggestions: async (query: string) => {
        if (!query.trim()) {
            set({ suggestions: [] });
            return;
        }

        try {
            const response = await axios.get(`${OPEN_CAGE_URL}`, {
                params: {
                    q: query,
                    key: OPEN_CAGE_API_KEY,
                },
            });

            const suggestions = response.data.results.map((result: any) => ({
                name: result.formatted,
                lat: result.geometry.lat,
                lng: result.geometry.lng,
            }));

            set({ suggestions });
        } catch (error) {
            console.error("Error fetching suggestions:", error);
            set({ suggestions: [] });
        }
    },

    // Fetch weather data for a specific city
    fetchWeatherByCity: async (city: string) => {
        if (!city.trim()) {
            set({ error: "City name cannot be empty" });
            return;
        }

        set({ loading: true, error: null });

        try {
            // Fetch location coordinates from OpenCage
            const geoResponse = await axios.get(`https://api.opencagedata.com/geocode/v1/json`, {
                params: {
                    q: city,
                    key: OPEN_CAGE_API_KEY,
                },
            });

            const locationData = geoResponse.data.results[0];
            console.log(locationData);
            
            if (!locationData) {
                throw new Error("Location not found");
            }

            const { formatted: name, geometry: { lat, lng }, components } = locationData;

            // Fetch weather data from Open Meteo
            const weatherResponse = await axios.get(`https://api.open-meteo.com/v1/forecast`, {
                params: {
                    latitude: lat,
                    longitude: lng,
                    current: ["temperature_2m", "relative_humidity_2m", "apparent_temperature", "precipitation", "rain", "snowfall", "weather_code", "cloud_cover", "wind_speed_10m"],
                    hourly: ["temperature_2m", "precipitation_probability", "snowfall"],
                    daily: ["precipitation_sum", "snowfall_sum","uv_index_max"],
                    forecast_days: 14,
                    timezone: "auto",
                },
            });

            // Update store with weather data and selected location
            set({
                weatherData: weatherResponse.data,
                selectedLocation: { name, lat, lng, components },
                loading: false,
            });
        } catch (error: any) {
            console.error("Error fetching weather data:", error);
            set({
                error: error.message || "Failed to fetch weather data",
                loading: false,
            });
        }
    },
}));
