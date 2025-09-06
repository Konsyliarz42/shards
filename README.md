# Shards

Simple React router with fancy name.

> **Why shards?** \
> Each pathname of URL is like shard of their origin. So I decided to name this project "Shards".

## What is `Shard`?

Shard is an object of definition of route, and contains these properties:

- `Page: PageComponent` - React component to render.
- `Layout: LayoutComponent` - React component used as base of `Page`.
- `overrideLayout: boolean` - Flag to avoiding using inherit layouts. This option is affect to child pathnames as well.

## Usage

In root of your app return `FractureCore`.

```tsx
// App.tsx

import React from "react"
import FractureCore from "shards"

// Your example pages
import {
  RootPage,
  BoxesPage,
  BoxPage,
  BoxItemsPage,
  BoxItemPage
} from "./pages"
// Your example layouts
import { BoxLayout, BoxItemLayout } from "./layouts"

export default function App(): React.ReactElement {
  ... // Code of App

  return <FractureCore
    mainShard={ Page: RootPage }
    shards={{
      "box": { Page: BoxesPage },
      "box/{boxId}": { Page: BoxPage, Layout: BoxLayout },
      "box/{boxId}/items": { Page: BoxItemsPage },
      "box/{boxId}/items/{itemId}": { Page: BoxItemPage, Layout: BoxItemLayout, overrideLayout: true },
    }}
  />
}
```

### Fracture core

The `FractureCore` is main component used as router. \
This component require to define [shards](#what-is-shard) with their pathnames. Apart from `mainShard` and common `shards` you can also define `unknownShard` used when pathname of URL is not matched with defined shards. By default this shard uses default [404 page](./lib/Page404.tsx).

### Page components

Each page should be react component with props: `hash`, `pathParams`, `searchParams`. \
These props contains only initial values and will be not updated (until reload page). This behaviour is necessary to avoid rerendering whole page after change. If you need to manipulate these values check dedicated [hooks](#react-hooks).

_Example:_

```tsx
import React from "react"
import type { PageComponentProps } from "shards"

export default ExamplePage({ hash, pathParams, searchParams }: PageComponentProps): React.Element {
  ... // Logic of page

  return <section>
    <h2>Example page</h2>
  </section>
}
```

### Layout components

Each layout should be react component with `children` prop.

_Example:_

```tsx
import React from "react"
import type { LayoutComponentProps } from "shards"

export default ExampleLayout({ children }: LayoutComponentProps): React.Element {
  ... // Logic of layout

  return <>
    <header>
      <h1>Example Layout</h1>
    </header>
    <main>
      {children}
    </main>
    <footer>
      <small>Works fine</small>
    </footer>
  </>
}
```

### Dynamic pathnames

To define dynamic pathname wrap dynamic part with `{}`. \
After render, page will receive its name and value as string.

_Examples_:

| Shard pathname             | Url pathname       | Path params                     |
| -------------------------- | ------------------ | ------------------------------- |
| box/{boxId}                | /box/42            | { boxId: "42" }                 |
| box/{boxId}/items/{itemId} | /box/42/items/it24 | { boxId: "42", itemId: "it24" } |

### Layouts

Layouts are very useful and you can add them to [shard definition](#what-is-shard-route). \
When pathname will start with another pathname then will be its child and inherit its layout. \
You can avoid using inherit layouts by setting `overrideLayout: true`.

---

## React hooks

> More information you can find in the [code](./lib/hooks).

### `useHash()`

Returns current hash string (without `#`) and callback to set new value.

### `usePathParams()`

Returns object of dynamic part of pathnames. You can change them only by [`redirect`](#redirecturl) function.

### `useSearchParams()`

Return `URLSearchParams` object with current search params and callback to set new one.

### `useUrl()`

Return current `URL` object built from current URL state.

> You can manually trigger update state by sending `changeUrl` custom event with new `URL` object.

---

## Utils

> More information you can find in the [code](./lib/utils.ts).

### `redirect(url)`

Go to target URL.

### `replace(url)`

Change `hash` or `search` in current URL without reloading whole page.

### `reload()`

Reload current page.
