import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import ThemeModeProvider from "../theme/ThemeModeProvider";
import NetworkConnection from "../components/network-connection";
import Favicon from "../components/favicon";
import Loader from "../components/common/Loader";

function App() {
  return (
    <ThemeModeProvider>
      <Favicon />
      <NetworkConnection />
      <Loader />
      <RouterProvider router={router} />
    </ThemeModeProvider>
  );
}

export default App;
