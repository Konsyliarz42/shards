import React from "react";
import { PageContext } from "./FractureCore";

export default function useSearchParams(): URLSearchParams | undefined {
  const context = React.useContext(PageContext);
  return context.searchParams;
}
