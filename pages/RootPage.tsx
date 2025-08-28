import type React from "react";
import type { LayoutComponentProps, PageComponentProps } from "../lib/FractureCore";

export function RootLayout(props: LayoutComponentProps): React.ReactNode {
  return (
    <>
      <h1>RootLayout</h1>
      {props.children}
    </>
  );
}

export default function RootPage(props: PageComponentProps): React.ReactNode {
  return (
    <>
      <h1>RootPage</h1>
      <p>{JSON.stringify(props, undefined, 2)}</p>
    </>
  );
}
