const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export interface WeatherData {
  temp: number;
  condition: string;
  icon: string;
}

export async function getWeather(lat: number = 43.65, lon: number = -79.38): Promise<WeatherData> {
  const res = await fetch(
    `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );
  if (!res.ok) throw new Error('Weather fetch failed');
  const data = await res.json();
  return {
    temp: Math.round(data.main.temp),
    condition: data.weather[0].main,
    icon: data.weather[0].icon,
  };
}
