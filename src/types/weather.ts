import { LocationType } from "./locationType.ts";
export type WeatherOfLocation = {
  weather: Weather;
  location: LocationType;
};

export type Weather = {
  weather: {
    id: number | string;
    main: string;
    description: string;
  };
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
};
