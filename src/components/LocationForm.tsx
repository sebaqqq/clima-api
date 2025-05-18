import React, { useState } from "react";
import { Location } from "../types/weather";
import { MapPin, Search } from "lucide-react";

interface LocationFormProps {
  currentLocation: Location;
  onSearch: (city: string) => void;
}

const LocationForm: React.FC<LocationFormProps> = ({
  currentLocation,
  onSearch,
}) => {
  const [city, setCity] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!city.trim()) {
      setError("Por favor ingrese un nombre de ciudad");
      return;
    }

    setError(null);
    onSearch(city.trim());
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow-md transition-all hover:shadow-lg mb-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center mb-2">
          <MapPin className="w-5 h-5 text-blue-400 mr-2" />
          <h2 className="text-lg font-medium text-gray-200">Ubicación</h2>
        </div>

        <div className="relative">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Buscar ciudad..."
            className="w-full px-4 py-2 pr-10 bg-gray-700 border border-gray-600 rounded-md text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-400"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>

        {error && <div className="text-red-400 text-sm">{error}</div>}

        {currentLocation.name && (
          <div className="text-gray-400 text-sm mt-2">
            Ubicación actual: {currentLocation.name}
          </div>
        )}
      </form>
    </div>
  );
};

export default LocationForm;
