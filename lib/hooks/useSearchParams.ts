import React from "react";
import { replace } from "../utils";
import useUrl from "./useUrl";

/**
 * Get getter and setter for the search params.
 */
export default function useSearchParams(): {
  searchParams: URLSearchParams | undefined;
  setSearchParams: (newValue: URLSearchParams | undefined) => void;
} {
  const url = useUrl();

  // biome-ignore lint/correctness/useExhaustiveDependencies: `search` and `searchParams` are sync.
  const searchParams = React.useMemo(() => (url.search ? url.searchParams : undefined), [url.search]);
  const setSearchParams = React.useCallback(
    (newSearchParams: URLSearchParams | undefined) => replace({ searchParams: newSearchParams }),
    [],
  );

  return { searchParams, setSearchParams };
}
