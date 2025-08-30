# Shards

Simple React router with fancy name.

> **Why shards?** \
> Each pathname of URL is like shard of their origin. So I decided to name this project "Shards".

## Usage

On the start I recommend to create `pages` directory. To separate page components from other.
After this create your page component.

```tsx
import type React from "react";
import type { LayoutComponentProps, PageComponentProps } from "shards";

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

```