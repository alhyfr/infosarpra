import { createBrowserRouter } from "react-router";
import App from "../App";
import TV from "../pages/tv";
import COE from "../pages/coe";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/tv",
    element: <TV />,
  },
  {
    path: "/coe",
    element: <COE />,
  },
]);

export default router;