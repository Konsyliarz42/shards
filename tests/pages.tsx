import type { PageComponentProps } from "../lib/types";

export function Page1(props: PageComponentProps): React.ReactElement {
  return (
    <section>
      <h1>Page1</h1>
      <ul>
        <li>Hash: {props.hash || "-"}</li>
        <li>Path params: {props.pathParams ? JSON.stringify(props.pathParams) : "-"}</li>
        <li>Search params: {props.searchParams ? props.searchParams.toString() : "-"}</li>
      </ul>
    </section>
  );
}

export function Page2(props: PageComponentProps): React.ReactElement {
  return (
    <section>
      <h1>Page2</h1>
      <ul>
        <li>Hash: {props.hash || "-"}</li>
        <li>Path params: {props.pathParams ? JSON.stringify(props.pathParams) : "-"}</li>
        <li>Search params: {props.searchParams ? props.searchParams.toString() : "-"}</li>
      </ul>
    </section>
  );
}

export function Page3(props: PageComponentProps): React.ReactElement {
  return (
    <section>
      <h1>Page3</h1>
      <ul>
        <li>Hash: {props.hash || "-"}</li>
        <li>Path params: {props.pathParams ? JSON.stringify(props.pathParams) : "-"}</li>
        <li>Search params: {props.searchParams ? props.searchParams.toString() : "-"}</li>
      </ul>
    </section>
  );
}