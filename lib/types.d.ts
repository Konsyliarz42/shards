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

export type Host = string | { hostname: string; port: number };
export type Origin = string | { protocol: string; host: Host };
export type Href = string | { origin: Origin; pathname?: string; search?: string | URLSearchParams; hash?: string };
