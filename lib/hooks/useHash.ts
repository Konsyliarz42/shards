import React from "react";
import { replace } from "../utils";
import useUrl from "./useUrl";

/**
 * Get getter and setter for the fragment identifier of the location URL.
 */
export default function useHash(): {
  hash: string | undefined;
  setHash: (newValue: string | undefined) => void;
} {
  const url = useUrl();

  const hash = React.useMemo(() => (url.hash ? url.hash.slice(1) : undefined), [url.hash]);
  const setHash = React.useCallback((newHash: string | undefined) => replace({ hash: newHash }), []);

  return { hash, setHash };
}
