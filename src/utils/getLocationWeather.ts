import axios, { AxiosResponse } from "axios";
import {
  LocationQueryString,
  Weather,
  WeatherOfLocation,
  LocationType,
} from "../types";

const baseURL = import.meta.env.VITE_ENDPOINT;
const apiKey = import.meta.env.VITE_API_KEY;

export const getLocationWeather = async (queryStrings: {
  q: LocationQueryString;
}): Promise<WeatherOfLocation> => {
  const { cityName, countryCode } = queryStrings.q;
  const query = `${cityName || ""},${countryCode || ""}`;
  //get lon and lat of searching location
  const locationResponse: AxiosResponse<LocationType[]> = await axios.get(
    `${baseURL}/geo/1.0/direct?q=${query}&limit=1&appid=${apiKey}`,
  );

  if (locationResponse.data.length === 0) {
    throw new Error("Not Found");
  }

  const { lat, lon } = locationResponse.data[0];

  const weatherResponse: AxiosResponse<{
    main: Weather["main"];
    weather: Array<Weather["weather"]>;
  }> = await axios.get(
    `${baseURL}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`,
  );

  return {
    weather: {
      main: weatherResponse.data.main,
      weather: weatherResponse.data.weather[0],
    },
    location: locationResponse.data[0],
  };
};
