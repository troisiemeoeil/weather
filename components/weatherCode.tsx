import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Label } from "./ui/label";

export default function WeatherCode({ weatherCode, style }: { weatherCode: string, style?: string }) {
  const codes = [
    { code: "0-0", description: "Clear sky", emoji: "☀️" },
    { code: "1-1", description: "Partly cloudy", emoji: "🌤️" },
    { code: "2-2", description: "Cloudy", emoji: "☁️" },
    { code: "3-9", description: "Overcast", emoji: "🌥️" },
    { code: "10", description: "Light rain showers", emoji: "🌦️" },
    { code: "11", description: "Rain showers", emoji: "🌧️" },
    { code: "12-19", description: "Heavy rain showers", emoji: "🌩️" },
    { code: "20-29", description: "Fog", emoji: "🌫️" },
    { code: "30", description: "Snow", emoji: "❄️" },
    { code: "31-39", description: "Snow showers", emoji: "🌨️" },
    { code: "40-49", description: "Thunderstorms", emoji: "⛈️" },
    { code: "50-59", description: "Drizzle", emoji: "🌦️" },
    { code: "60-69", description: "Rain", emoji: "🌧️" },
    { code: "70-79", description: "Snowfall", emoji: "❄️" },
    { code: "80-89", description: "Showers", emoji: "🌦️" },
    { code: "90-94", description: "Thunderstorm with hail", emoji: "🌩️" },
    { code: ">95", description: "Thunderstorm with hail", emoji: "🌩️" }
  ];

  // Function to get weather condition by WMO code
  function getWeatherCode(codes: any[], code: string) {
    const codeInNum = parseInt(code);

    for (const entry of codes) {
      if (entry.code.includes("-")) {
        // Handle range codes (e.g., "60-69")
        const [min, max] = entry.code.split("-").map(Number);
        if (codeInNum >= min && codeInNum <= max) {
          return `${entry.emoji}`;
        }
      } else if (entry.code.startsWith(">")) {
        // Handle greater-than codes (e.g., ">95")
        const threshold = parseInt(entry.code.substring(1));
        if (codeInNum > threshold) {
          return `${entry.emoji}`;
        }
      }
    }
    return "N/A 🌈";
  }

  return <Label className={style}>
    {getWeatherCode(codes, weatherCode)}
  </Label>;
}
