import React from "react";
import Page404 from "./Page404";
import type { LayoutComponent, PageComponent, PageComponentProps, PathParams, Shard } from "./types";

export const PageContext = React.createContext<PageComponentProps>({});

export interface FractureCoreProps {
  /**
   * Definition of root path (`/`)
   */
  mainShard: Shard;
  /**
   * Definition of routes.
   */
  shards: { [pathname: string]: Shard };
  /**
   * Definition of page with 404 error.
   */
  unknownShard?: Shard;
}
/**
 * Just router, core of rendering pages.
 * @param {FractureCoreProps} props Router configuration.
 */
export default function FractureCore(props: FractureCoreProps): React.ReactElement {
  const RootPage: PageComponent | undefined = props.mainShard.Page;
  const RootLayout: LayoutComponent | undefined = props.mainShard.Layout;
  const currentPathname = window.location.pathname;
  let layouts: LayoutComponent[] = RootLayout ? [RootLayout] : [];

  // Render matched pathname with shard
  let pageProps = getPageProps(undefined);
  if (currentPathname !== "/") {
    const currentPathnameParts = splitPathname(currentPathname);
    for (const [pathname, shard] of Object.entries(props.shards)) {
      const pathnameParts = splitPathname(pathname);
      const { isMatched, isSubpath, pathParams } = matchPathname(currentPathnameParts, pathnameParts);
      pageProps = getPageProps(pathParams);

      if ((isMatched || isSubpath) && shard.Layout)
        if (shard.overrideLayout) layouts = [shard.Layout];
        else layouts.push(shard.Layout);

      if (isMatched) return buildFullPage(layouts, shard.Page, pageProps);
    }
  } else return buildFullPage(layouts, RootPage, pageProps);

  // Render page 404
  let Page = Page404 as PageComponent;
  if (props.unknownShard) {
    Page = props.unknownShard.Page;
    if (props.unknownShard.Layout) {
      if (props.unknownShard.overrideLayout) layouts = [props.unknownShard.Layout];
      else layouts.push(props.unknownShard.Layout);
    }
  }
  return buildFullPage(layouts, Page, pageProps);
}

function splitPathname(pathname: string): string[] {
  let newPathname = pathname;

  if (pathname.startsWith("/")) newPathname = newPathname.slice(1);
  if (pathname.endsWith("/")) newPathname = newPathname.slice(0, -1);

  return newPathname.split("/");
}

function matchPathname(
  currentPathnameParts: string[],
  shardPathnameParts: string[],
): { isMatched: boolean; isSubpath: boolean; pathParams: PathParams | undefined } {
  const params: PathParams = {};

  for (let index = 0; index < shardPathnameParts.length; index++) {
    const partA = shardPathnameParts[index];
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

  if (shardPathnameParts.length < currentPathnameParts.length)
    return { isMatched: false, isSubpath: true, pathParams: params };

  return { isMatched: true, isSubpath: false, pathParams: params };
}

function getPageProps(pathParams: PageComponentProps["pathParams"]): PageComponentProps {
  const searchString = window.location.search;
  const searchParams = searchString.startsWith("?") ? new URLSearchParams(searchString) : undefined;

  const hashString = window.location.hash;
  const hash = hashString.startsWith("#") ? hashString.slice(1) : undefined;

  let newPathParams = pathParams;
  if (pathParams && Object.keys(pathParams).length === 0) newPathParams = undefined;

  return { hash, searchParams, pathParams: newPathParams };
}

function buildFullPage(
  layouts: LayoutComponent[],
  Page: PageComponent,
  pageProps: PageComponentProps,
): React.ReactElement {
  let FullPage: React.ReactElement = <Page {...pageProps} />;
  layouts.reverse().forEach((Layout) => {
    FullPage = <Layout>{FullPage}</Layout>;
  });

  return <PageContext.Provider value={pageProps}>{FullPage}</PageContext.Provider>;
}
