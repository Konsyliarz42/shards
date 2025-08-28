import FractureCore from "./lib/FractureCore";
import FirstPage, { FirstLayout } from "./pages/FirstPage";
import RootPage, { RootLayout } from "./pages/RootPage";

export default function App(): React.ReactNode {
  return (
    <FractureCore
      mainShard={{
        Page: RootPage,
        Layout: RootLayout,
      }}
      shards={{
        "/dupa": { Page: FirstPage, Layout: FirstLayout, overrideLayout: true },
        "/dupa/{id}/{x}": { Page: FirstPage },
      }}
    />
  );
}
