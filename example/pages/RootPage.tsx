import type React from "react";
import type { LayoutComponentProps, PageComponentProps } from "../../lib/types";

export function RootLayout(props: LayoutComponentProps): React.ReactNode {
  return (
    <>
      <h1>RootLayout</h1>
      {props.children}
    </>
  );
}

export default function RootPage(props: PageComponentProps): React.ReactNode {
  console.log(window.location.href, props);
  return <h1>RootPage</h1>;
}
