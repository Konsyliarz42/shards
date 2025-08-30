import React from "react";
import { PageContext } from "./FractureCore";
import type { PathParams } from "./types";

export default function usePathParams(): PathParams | undefined {
  const context = React.useContext(PageContext);
  return context.pathParams;
}
