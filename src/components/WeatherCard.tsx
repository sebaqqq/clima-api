import React from "react";
import { WeatherResponse } from "../types/weather";
import { Thermometer, Wind, Clock } from "lucide-react";

interface WeatherCardProps {
  weatherData: WeatherResponse;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weatherData }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const { current } = weatherData;

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-md transition-all hover:shadow-lg w-full overflow-hidden">
      <h2 className="text-xl font-bold text-gray-200 mb-4 flex items-center">
        Clima Actual
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col items-center p-4 bg-gray-700 rounded-lg">
          <Thermometer className="w-8 h-8 text-blue-400 mb-2" />
          <span className="text-sm text-gray-300 mb-1">Temperatura</span>
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-gray-200">
              {current.temperature_2m}
            </span>
            <span className="ml-1 text-gray-400">°C</span>
          </div>
        </div>

        <div className="flex flex-col items-center p-4 bg-gray-700 rounded-lg">
          <Wind className="w-8 h-8 text-purple-400 mb-2" />
          <span className="text-sm text-gray-300 mb-1">
            Velocidad del Viento
          </span>
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-gray-200">
              {current.wind_speed_10m}
            </span>
            <span className="ml-1 text-gray-400">km/h</span>
          </div>
        </div>

        <div className="flex flex-col items-center p-4 bg-gray-700 rounded-lg">
          <Clock className="w-8 h-8 text-gray-400 mb-2" />
          <span className="text-sm text-gray-300 mb-1">Actualizado</span>
          <div className="flex items-center">
            <span className="text-lg font-medium text-gray-200">
              {formatDate(current.time)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
