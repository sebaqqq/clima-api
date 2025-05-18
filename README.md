# 🌤️ WeatherApp - API Open-Meteo

Aplicación web minimalista que consume la API pública de [Open-Meteo](https://open-meteo.com) para mostrar el clima actual y pronósticos por hora.

## 🧩 Características

- Consulta en tiempo real de:
  - Temperatura actual
  - Velocidad del viento
  - Pronóstico por hora (temperatura, viento y humedad)
- Gráfico interactivo por hora con datos meteorológicos
- Inputs dinámicos para cambiar latitud y longitud
- Indicador de carga mientras se traen los datos

## 🚀 Tecnologías utilizadas

- React (Vite o CRA)
- TailwindCSS o CSS Modules
- Recharts (para gráficos)
- Fetch API

## 🌍 API utilizada

**[Open-Meteo Forecast API](https://open-meteo.com/en/docs):**

```bash
https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m
