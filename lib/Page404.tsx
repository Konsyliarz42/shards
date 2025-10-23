import type React from "react";

/**
 * Default page used when shard(route) is not found.
 */
export default function Page404(): React.ReactElement {
  return (
    <section>
      <h1>404</h1>
      <p>Page not found</p>
    </section>
  );
}
