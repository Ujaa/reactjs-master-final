import { createBrowserRouter } from "react-router-dom";
import Popular from "../screens/Popular";
import ComingSoon from "../screens/ComingSoon";
import NowPlaying from "../screens/NowPlaying";
import App from "../App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Popular /> },
      { path: "coming-soon", element: <ComingSoon /> },
      { path: "now-playing", element: <NowPlaying /> },
    ],
  },
]);

export default router;
