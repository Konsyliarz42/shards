import type React from "react";
import type { LayoutComponentProps, PageComponentProps } from "../../lib/types";
import { redirect } from "../../lib/utils";


export function DynamicLayout(props: LayoutComponentProps): React.ReactNode {
  return (
    <>
      <h1>DynamicLayout</h1>
      {props.children}
    </>
  );
}

export default function DynamicPage(props: PageComponentProps): React.ReactNode {
  console.log(window.location.href, props);
  return <>
  <h1>DynamicPage</h1>
  <button type="button" onClick={() => redirect({href: "/"})}>Redirect</button>
  </>;
}
