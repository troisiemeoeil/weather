
![Project Image](https://centriafi-my.sharepoint.com/:i:/g/personal/ahmed_boulakhras_centria_fi/Edc9D4JbjLlPqdsX8iSGfM8BUyKlsWAsFOBge_YZUrSiRw?e=coD80B.png)

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
- 24-hour forecast
- Weather conditions
- Geocoding using OpenCageData
- Natural language processing using Gemini AI

## Installation

To install the dependencies, run the following command in your terminal:

```bash
npm install .
```

## Usage

To start the development server, run the following command:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

## API Reference

The app uses the OpenWeatherMap API to fetch weather data and the OpenCageData API to geocode locations. It also uses the Gemini AI API to generate weather forecasts using natural language processing.



