import { getLocationWeather } from "../../utils";
import {
  LOCAL_STORAGE_KEYS,
  SearchHistoryItemType,
  WeatherOfLocation,
} from "../../types";
import dayjs from "dayjs";

export const fetchWeather = async (values: {
  cityName: string;
  countryCode?: string;
}): Promise<WeatherOfLocation> => {
  const data = await getLocationWeather({
    q: { ...values },
  });

  const newSearchRecord: SearchHistoryItemType = {
    location: data.location,
    createdAt: dayjs().format(),
  };

  let searchData = localStorage.getItem(LOCAL_STORAGE_KEYS.SEARCH_HISTORY);

  if (searchData) {
    searchData = JSON.parse(searchData);
  }

  localStorage.setItem(
    LOCAL_STORAGE_KEYS.SEARCH_HISTORY,
    JSON.stringify([newSearchRecord, ...(searchData || [])]),
  );
  window.dispatchEvent(new Event("storage"));

  return data;
};
