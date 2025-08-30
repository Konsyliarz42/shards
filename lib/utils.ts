import type { Origin } from "./types";

export type ReplaceArgs = {
  pathname?: string;
  searchParams?: URLSearchParams;
  hash?: string;
};
/**
 * Replace current URL without reloading page. \
 * This function is advanced version of {@link https://developer.mozilla.org/en-US/docs/Web/API/Location/replace | location.replace}.
 * @param {ReplaceArgs} args Parts of URL to replace. Based on {@link https://developer.mozilla.org/en-US/docs/Web/API/Location#location_anatomy | location anatomy}.
 */
export function replace(args: ReplaceArgs): void {
  const location = window.location;

  const pathname = args.pathname ? unifyPathname(args.pathname) : location.pathname;
  const search = args.searchParams ? unifySearchParams(args.searchParams) : location.search;
  const hash = args.hash ? unifyHash(args.hash) : location.hash;

  location.replace(`${location.origin}${pathname}${search}${hash}`);
}

export type RedirectArgs = {
  hash?: string;
  origin?: Origin;
  pathname: string;
  searchParams?: URLSearchParams;
};
/**
 * Redirect to new URL address.
 * @param {RedirectArgs} args Configuration of target URL. Based on {@link https://developer.mozilla.org/en-US/docs/Web/API/Location#location_anatomy | location anatomy}.
 */
export function redirect(args: RedirectArgs): void {
  const origin = args.origin ? unifyOrigin(args.origin) : "";
  const pathname = unifyPathname(args.pathname);
  const searchParams = args.searchParams ? unifySearchParams(args.searchParams) : "";
  const hash = args.hash ? unifyHash(args.hash) : "";

  window.location.assign(`${origin}${pathname}${searchParams}${hash}`);
}

/**
 * Reload current page.
 */
export function reload(): void {
  window.location.reload();
}

// Don't export these functions there are only as helpers!

function unifyOrigin(origin: Origin): string {
  if (typeof origin === "string") return origin;
  if (typeof origin.host === "string") return `${origin.protocol}://${origin.host}`;

  return `${origin.protocol}://${origin.host.hostname}:${origin.host.port}`;
}
function unifyPathname(pathname: string): string {
  if (pathname.length === 0) return "";

  let newPathname = pathname;

  if (!newPathname.startsWith("/")) newPathname = `/${pathname}`;
  if (newPathname.endsWith("/")) newPathname = newPathname.slice(0, -1);

  return newPathname;
}
function unifySearchParams(urlSearchParams: URLSearchParams): string {
  const searchString = urlSearchParams.toString();
  if (searchString.length === 0) return "";

  return `?${searchString}`;
}
function unifyHash(hash: string): string {
  if (hash.length === 0) return "";
  if (hash.startsWith("#")) return hash;

  return `#${hash}`;
}
