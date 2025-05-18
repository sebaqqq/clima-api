import { useState, useEffect } from "react";
import {
  WeatherResponse,
  HourlyData,
  Location,
  GeocodingResponse,
} from "../types/weather";

export const useWeather = (initialLocation: Location) => {
  const [location, setLocation] = useState<Location>(initialLocation);
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
  const [hourlyData, setHourlyData] = useState<HourlyData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const searchCity = async (cityName: string) => {
    try {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          cityName
        )}&count=1&language=es&format=json`
      );

      if (!response.ok) {
        throw new Error("Error searching for city");
      }

      const data: GeocodingResponse = await response.json();

      if (!data.results?.length) {
        throw new Error("Ciudad no encontrada");
      }

      const result = data.results[0];
      setLocation({
        latitude: result.latitude,
        longitude: result.longitude,
        name: `${result.name}${result.admin1 ? `, ${result.admin1}` : ""}, ${
          result.country
        }`,
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al buscar la ciudad"
      );
    }
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      setError(null);

      try {
        const { latitude, longitude } = location;
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`
        );

        if (!response.ok) {
          throw new Error(
            `Error fetching weather data: ${response.statusText}`
          );
        }

        const data: WeatherResponse = await response.json();
        setWeatherData(data);

        const formattedHourlyData: HourlyData[] = data.hourly.time.map(
          (time, index) => ({
            time,
            temperature_2m: data.hourly.temperature_2m[index],
            relative_humidity_2m: data.hourly.relative_humidity_2m[index],
            wind_speed_10m: data.hourly.wind_speed_10m[index],
          })
        );

        setHourlyData(formattedHourlyData.slice(0, 24));
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        console.error("Failed to fetch weather data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [location]);

  return {
    weatherData,
    hourlyData,
    loading,
    error,
    location,
    setLocation,
    searchCity,
  };
};
