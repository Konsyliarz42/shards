import React from "react";

/**
 * Returns the current `URL` object. It will be updated when the `changeUrl` event is sent.
 */
export default function useUrl(): URL {
  const [newUrl, setNewUrl] = React.useState<URL | undefined>(undefined);

  React.useEffect(() => {
    const updateHash = (event: CustomEvent<URL>) => setNewUrl(event.detail);
    window.addEventListener("changeUrl", updateHash);
    return () => window.removeEventListener("changeUrl", updateHash);
  }, []);

  return newUrl || new URL(window.location.href);
}
