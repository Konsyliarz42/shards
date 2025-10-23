import type { Origin } from "./types";

/**
 * Return origin object as string.
 */
export function stringifyOrigin(origin: Origin): string {
  if (typeof origin === "string") return origin;
  if (typeof origin.host === "string") return `${origin.protocol}://${origin.host}`;

  return `${origin.protocol}://${origin.host.hostname}:${origin.host.port}`;
}

/**
 * Return pathname as unified string (without trailing `/`) or empty string. \
 * Root pathname (`/`) is an exception.
 */
export function unifyPathname(pathname: string): string {
  if (pathname.length === 0) return "";
  if (pathname === "/") return "/"

  let newPathname = pathname;

  if (!newPathname.startsWith("/")) newPathname = `/${pathname}`;
  if (newPathname.endsWith("/")) newPathname = newPathname.slice(0, -1);

  return newPathname;
}

/**
 * Return search params object as unified string (with leading `?`) or empty string.
 */
export function stringifySearchParams(searchParams: URLSearchParams | string): string {
  let search: string;

  if (typeof searchParams === "string") search = searchParams;
  else search = searchParams.toString();

  if (!search.startsWith("?")) search = `?${search}`;
  if (search.length < 4) return "";

  return search;
}

/**
 * Return hash as unified string (with leading `#`) or empty string.
 */
export function unifyHash(hash: string): string {
  if (hash.length === 0) return "";
  if (hash.startsWith("#")) return hash;

  return `#${hash}`;
}

export type ReplaceUrl =
  | string
  | URL
  | {
      search?: URLSearchParams | string;
      hash?: string;
    };
/**
 * Replace current URL without reloading page. \
 * @param {ReplaceUrl} url target url as `string`, `URL` or parts of URL based on {@link https://developer.mozilla.org/en-US/docs/Web/API/Location#location_anatomy | location anatomy}.
 */
export function replace(url: ReplaceUrl): void {
  const location = window.location;
  let _url:
    | URL
    | {
        search?: URLSearchParams | string;
        hash?: string;
      };

  if (typeof url === "string") {
    if (url.startsWith("http")) _url = new URL(url);
    else _url = new URL(`${location.origin}${url}`);
  } else _url = url;

  const pathname = unifyPathname(location.pathname);
  const search = _url.search ? stringifySearchParams(_url.search) : location.search;
  const hash = _url.hash ? unifyHash(_url.hash) : location.hash;

  window.history.replaceState(
    {
      pathname: pathname,
      search: search,
      hash: hash,
    },
    "",
    `${pathname}${search}${hash}`,
  );
  window.dispatchEvent(
    new CustomEvent("changeUrl", { detail: new URL(`${window.location.origin}${pathname}${search}${hash}`) }),
  );
}

export type RedirectUrl =
  | string
  | URL
  | {
      hash?: string;
      origin?: Origin;
      pathname: string;
      search?: URLSearchParams | string;
    };
/**
 * Redirect to new URL address. \
 * This function is modified version of {@link https://developer.mozilla.org/en-US/docs/Web/API/Location/assign | location.assign}.
 * @param {RedirectUrl} url Target URL as `string`, `URL` or object based on {@link https://developer.mozilla.org/en-US/docs/Web/API/Location#location_anatomy | location anatomy}.
 */
export function redirect(url: RedirectUrl): void {
  let stringUrl: string;

  if (typeof url === "string") {
    stringUrl = url;
  } else {
    const origin = url.origin ? stringifyOrigin(url.origin) : "";
    const pathname = unifyPathname(url.pathname);
    const search = url.search ? stringifySearchParams(url.search) : "";
    const hash = url.hash ? unifyHash(url.hash) : "";

    stringUrl = `${origin}${pathname}${search}${hash}`;
  }

  if (stringUrl === "") return;

  window.location.assign(stringUrl);
}

/**
 * Reload current page. \
 * Alias for {@link https://developer.mozilla.org/en-US/docs/Web/API/Location/reload | location.reload}.
 */
export function reload(): void {
  window.location.reload();
}
