import type React from "react";
import type { LayoutComponentProps, PageComponentProps } from "../lib/FractureCore";

export function FirstLayout(props: LayoutComponentProps): React.ReactNode {
  return (
    <>
      <h1>FirstLayout</h1>
      {props.children}
    </>
  );
}

export default function FirstPage(props: PageComponentProps): React.ReactNode {
  return (
    <>
      <h1>FirstPage</h1>
      <p>{JSON.stringify(props, undefined, 2)}</p>
    </>
  );
}
