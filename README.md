
![Project Image](https://i.postimg.cc/7Zh2tkKg/Banner.png)

# Modern Weather Application made with Next.js and Gemini AI
## A feature rich weather forecast app showing the current weather, 24-hour forecast, and weather conditions for a given location. 

This project utilizes the OpenWeatherMap API to fetch weather data and the OpenCageData API to geocode locations. It also uses the Gemini AI API to generate weather forecasts using natural language processing.
This project make use of the OpenMeteo api to fetch current weather data, daily forecast, and hourly forecast. It uses OpenCageData to transform city names to coordinates. The coordinates will then be fed to Mapbox to display the location on a map.
Finally, the app uses Gemini AI to generate a description of the location featuring interesting facts and statistics.

## Technologies used to build this app: 

1. Next.js: It serves as the framework for the frontend and provides features such as routing, server-side rendering, and client-side hydration.
2. Zustand: It manages the global state across the application, allowing for easy and efficient access to data from anywhere in the app.   
3. Tailwind: It's a CSS framework that provide a pre built set of styles and utility classes. It's used to style the app and make it responsive.
4. Mapbox GL: A map library used to display the selected location, it's useful for a lot of advanced interactions.
5. Gemini AI: It's an AI model used in the application to generate a description of the location and provide the user with interesting facts and statistics.
6. Open meteo API: It's an API utilized to fetch data about the weather.
7. Open Cage Data API: It's an API used to transform city names to coordinates.


## Features

- Current weather updates
- 24-hour weather forecast
- Weather conditions (Percipitation and snowfall)
- Geolocation using Mapbox GL and geocoding using OpenCageData
- Natural language processing using Gemini AI
- Theme Switcher
- Responsive design

## Installation

1. Clone the repository to your local machine:
```bash
git clone https://github.com/troisiemeoeil/weather.git
```

2. Install the dependencies by run the following command in your terminal:

```bash
npm install 
```
or 

```bash
npm i
```

## Usage

To start the development server, run the following command:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

## API Reference

The app uses the OpenWeatherMap API to fetch weather data and the OpenCageData API to geocode locations. It also uses the Gemini AI API to generate weather forecasts using natural language processing.



