import React from "react";
import { PageContext } from "./FractureCore";

export default function useHash(): string | undefined {
  const context = React.useContext(PageContext);
  return context.hash;
}
