import type React from "react";
import type { PageComponentProps } from "../../lib/types";


export default function NestedPage(props: PageComponentProps): React.ReactNode {
  console.log(window.location.href, props);
  return <h1>NestedPage</h1>;
}
