import React from "react";
import { PageContext } from "../FractureCore";
import type { PathParams } from "../types";

/**
 * Get page path params.
 */
export default function usePathParams(): PathParams | undefined {
  const context = React.useContext(PageContext);
  return context.pathParams;
}
