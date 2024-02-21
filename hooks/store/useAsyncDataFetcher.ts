import useSWR from "swr";
import { fetcher } from "@/lib/utils/fetcher";

function useAsyncDataFetcher<T>(url: string, fallbackData?: T) {
  const { data, error } = useSWR<T>(url, fetcher, { fallbackData });

  return {
    data,
    isLoading: !error && !data,
    error,
  };
}

export default useAsyncDataFetcher;
