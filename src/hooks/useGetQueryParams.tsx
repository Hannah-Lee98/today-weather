import { useLocation } from "react-router-dom";
import { useMemo } from "react";

export const useGetQueryParams = <T,>() => {
  const { search } = useLocation();

  return useMemo<T>(
    () => Object.fromEntries([...new URLSearchParams(search)]) as T,
    [search],
  );
};
