import FractureCore from "../lib/FractureCore";
import DynamicPage, { DynamicLayout } from "./pages/DynamicPage";
import FirstPage from "./pages/FirstPage";
import NestedPage from "./pages/NestedPage";
import RootPage, { RootLayout } from "./pages/RootPage";

export default function App(): React.ReactNode {
  return (
    <FractureCore
      mainShard={{
        Page: RootPage,
        Layout: RootLayout,
      }}
      shards={{
        "/items": { Page: FirstPage },
        "/items/{itemId}": { Page: DynamicPage, Layout: DynamicLayout },
        "/items/{itemId}/{elementId}": { Page: NestedPage },
      }}
    />
  );
}
