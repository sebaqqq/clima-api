import { useWeather } from "./hooks/useWeather";
import WeatherCard from "./components/WeatherCard";
import WeatherChart from "./components/WeatherChart";
import LocationForm from "./components/LocationForm";
import LoadingSpinner from "./components/LoadingSpinner";
import { CloudSun } from "lucide-react";

function App() {
  const defaultLocation = {
    latitude: -33.4489,
    longitude: -70.6693,
    name: "Santiago, Chile",
  };

  const { weatherData, hourlyData, loading, error, location, searchCity } =
    useWeather(defaultLocation);

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <CloudSun className="w-10 h-10 text-blue-400 mr-2" />
            <h1 className="text-3xl font-bold text-gray-200">Clima App</h1>
          </div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Una aplicación minimalista y moderna para consultar el clima en
            cualquier ubicación del mundo.
          </p>
        </header>

        <LocationForm currentLocation={location} onSearch={searchCity} />

        {error && (
          <div className="bg-red-900 border-l-4 border-red-500 p-4 mb-6 rounded-md">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-300">{error}</p>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <div className="h-64 flex items-center justify-center">
            <LoadingSpinner />
          </div>
        ) : (
          weatherData && (
            <div className="space-y-6 animate-fadeIn">
              <WeatherCard weatherData={weatherData} />
              <WeatherChart hourlyData={hourlyData} />
            </div>
          )
        )}
      </div>

      <footer className="mt-12 bg-gray-800 bg-opacity-80 py-6">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-400 text-sm">
          <p>
            Datos proporcionados por
            <a
              href="https://open-meteo.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 ml-1"
            >
              Open-Meteo API
            </a>
          </p>
          <p className="mt-2">
            Desarrollado por
            <a
              href="https://github.com/sebaqqq"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 ml-1"
            >
              Sebastián Quintana
            </a>
          </p>
          <p className="mt-2">© {new Date().getFullYear()} Clima App</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
