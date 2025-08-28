import type React from "react";
import type { PageComponentProps } from "../lib/FractureCore";

export default function DynamicPage(props: PageComponentProps): React.ReactNode {
  return (
    <>
      <h1>DynamicPage</h1>
      <p>{JSON.stringify(props, undefined, 2)}</p>
    </>
  );
}
