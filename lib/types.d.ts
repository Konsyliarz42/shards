declare global {
  interface WindowEventMap {
    changeUrl: CustomEvent<URL>;
  }
}

export interface PathParams {
  [key: string]: string;
}
export interface PageComponentProps {
  /**
   * Initial hash value (without `#`). \
   * If you need to update or sync value with current URL use `useHash`.
   * */
  hash?: Readonly<string | undefined>;
  /**
   * Path params of page. \
   * You can also use `usePathParams` to read value.
   */
  pathParams?: Readonly<PathParams | undefined>;
  /**
   * Initial search params value. \
   * If you need to update or sync value with current URL use `useSearchParams`.
   */
  searchParams?: Readonly<URLSearchParams | undefined>;
}
export type PageComponent = React.ComponentType<PageComponentProps>;

export interface LayoutComponentProps {
  children: React.ReactElement | React.ReactElement[];
}
export type LayoutComponent = React.ComponentType<LayoutComponentProps>;

/**
 * Definition of route.
 */
export interface Shard {
  /**
   * React component to render. \
   * Each page has its own `PageComponentProps`.
   */
  Page: PageComponent;
  /**
   * React component to render as layout. \
   * Each layout has its own `LayoutComponentProps`. \
   * Layouts are stacked. That means:
   * RootLayout => Layout1 => Layout2 => Page
   */
  Layout?: LayoutComponent;
  /**
   * Don't use previous layouts.
   */
  overrideLayout?: boolean;
}

export type Host = string | { hostname: string; port: number };
export type Origin = string | { protocol: string; host: Host };
