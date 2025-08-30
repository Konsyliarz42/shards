class PathnameError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PathnameError";
  }
}

class SearchStringError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SearchStringError";
  }
}

class HashStringError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "HashStringError";
  }
}

export function validatePathname(pathname: string): void {
  if (pathname === "/") return;
  if (!pathname.startsWith("/")) throw new PathnameError("Pathname should start with '/'");
  if (pathname.endsWith("/")) throw new PathnameError("Pathname cannot end with '/'");
}

export function validateSearchString(searchString: string): void {
  if (searchString.length === 0) return;
  if (!searchString.startsWith("?")) throw new SearchStringError("Search string should start with '?'");
}

export function validateHashString(hashString: string): void {
  if (hashString.length === 0) return;
  if (!hashString.startsWith("#")) throw new HashStringError("Hash string should start with '#'");
}

