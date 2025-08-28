import type React from "react";
import Page404 from "./Page404";

export interface PathParams {
  [key: string]: string;
}
export interface PageComponentProps {
  hash?: string;
  pathParams?: PathParams;
  searchParams?: URLSearchParams;
}
export type PageComponent = React.ComponentType<PageComponentProps>;

export interface LayoutComponentProps {
  children: React.ReactElement | React.ReactElement[];
}
export type LayoutComponent = React.ComponentType<LayoutComponentProps>;

export interface Shard {
  Page: PageComponent;
  Layout?: LayoutComponent;
  overrideLayout?: boolean;
}

export interface FractureCoreProps {
  mainShard: Shard;
  shards: { [pathname: string]: Shard };
  unknownShard?: Shard;
}
export default function FractureCore(props: FractureCoreProps): React.ReactNode {
  const RootPage: PageComponent | undefined = props.mainShard.Page;
  const RootLayout: LayoutComponent | undefined = props.mainShard.Layout;

  // Remove slash on the end of pathname
  const currentPathname = window.location.pathname;
  if (currentPathname !== "/" && currentPathname.endsWith("/")) {
    replace(currentPathname.slice(0, currentPathname.length - 1));
    return null;
  }

  let layouts: LayoutComponent[] = [];
  if (RootLayout) layouts.push(RootLayout);

  // Render matched pathname with shard
  if (currentPathname !== "/") {
    const currentPathnameParts = currentPathname.slice(1).split("/");
    for (const [pathname, shard] of Object.entries(props.shards)) {
      if (!pathname.startsWith("/")) throw new Error("Pathname of shard should be start with '/'");

      const pathnameParts = pathname.slice(1).split("/");
      const { isMatched, isSubpath, pathParams } = matchPathname(currentPathnameParts, pathnameParts);
      const pageProps = getPageProps(pathParams);

      if ((isMatched || isSubpath) && shard.Layout)
        if (shard.overrideLayout) layouts = [shard.Layout];
        else layouts.push(shard.Layout);

      if (isMatched) return buildFullPage(layouts, shard.Page, pageProps);
    }
  } else return buildFullPage(layouts, RootPage);

  // Render page 404
  let Page = Page404 as PageComponent;
  if (props.unknownShard) {
    Page = props.unknownShard.Page;
    if (props.unknownShard.Layout) {
      if (props.unknownShard.overrideLayout) layouts = [props.unknownShard.Layout];
      else layouts.push(props.unknownShard.Layout);
    }
  }
  return buildFullPage(layouts, Page);
}

function replace(pathname?: string, searchParams?: URLSearchParams, hash?: string): void {
  const location = window.location;
  const search = searchParams ? `?${searchParams.toString()}` : undefined;
  const url = `${location.origin}${pathname || location.pathname}${search || location.search}${hash || location.hash}`;

  location.replace(url);
}

function getPageProps(pathParams: PathParams | undefined): PageComponentProps {
  const searchString = window.location.search;
  const searchParams = searchString.length > 3 ? new URLSearchParams(searchString) : undefined;

  const hashString = window.location.hash;
  const hash = hashString.length > 1 ? hashString.slice(1) : undefined;

  return { hash, searchParams, pathParams };
}

function matchPathname(
  currentPathnameParts: string[],
  pathnameParts: string[],
): { isMatched: boolean; isSubpath: boolean; pathParams: PathParams | undefined } {
  if (pathnameParts.length > currentPathnameParts.length)
    return { isMatched: false, isSubpath: false, pathParams: undefined };

  const params: PathParams = {};
  for (let index = 0; index < pathnameParts.length; index++) {
    const partA = pathnameParts[index];
    const partB = currentPathnameParts[index];

    if (partA.startsWith("{") && partA.endsWith("}")) {
      const paramKey = partA.slice(1, -1);
      params[paramKey] = partB;
      continue;
    }

    if (partA !== partB) {
      if (index === 0) return { isMatched: false, isSubpath: false, pathParams: undefined };
      return { isMatched: false, isSubpath: true, pathParams: params };
    }
  }

  if (pathnameParts.length < currentPathnameParts.length)
    return { isMatched: false, isSubpath: true, pathParams: params };

  return { isMatched: true, isSubpath: false, pathParams: params };
}

function buildFullPage(
  layouts: LayoutComponent[],
  Page: PageComponent,
  pageProps?: PageComponentProps,
): React.ReactElement {
  let FullPage: React.ReactElement = <Page {...pageProps} />;

  layouts.reverse().forEach((Layout) => {
    FullPage = <Layout>{FullPage}</Layout>;
  });

  return FullPage;
}
