import { render } from "vitest-browser-react";
import { expect } from "vitest";
import FractureCore from "../lib/FractureCore";
import { page } from '@vitest/browser/context'
import { Shard } from "../lib/types";
import { Page1, Page2 } from "./pages";
import { redirect } from "../lib/utils";

import { test } from 'playwright';

const shard1: Shard = { Page: Page1 };
const shard2: Shard = { Page: Page2 };

test("Minimal configuration", async () => {
  const screen = render(<FractureCore mainShard={shard1} shards={{ "/test": shard2 }} />);

  const heading1 = screen.getByRole("heading");
  await expect.element(heading1).toBeVisible();
  await expect.element(heading1).toHaveTextContent("Page1");

  // const searchParams = new URLSearchParams(location.search)
  // redirect({pathname: "/test", searchParams })

  window.location.href = `${window.location.href}test`
  await new Promise(resolve => setTimeout(resolve, 1000))

  const heading2 = screen.getByRole("heading");
  await expect.element(heading2).toBeVisible();
  await expect.element(heading2).toHaveTextContent("Page2");
});
