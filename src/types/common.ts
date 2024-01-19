import { LocationType } from "./locationType.ts";

export type LocationQueryString = { cityName: string; countryCode?: string };
export const TIME_FORMAT = {
  FULL_DATE_TIME: "YYYY-MM-DD hh:mm:A",
  TIME_ONLY: "hh:mm:A",
} as const;

export const LOCAL_STORAGE_KEYS = {
  SEARCH_HISTORY: "search-history",
} as const;

export type SearchHistoryItemType = {
  createdAt: string;
  location: LocationType;
};
