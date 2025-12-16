import { createBrowserRouter } from "react-router";
import App from "../App";
import TV from "../pages/tv";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/tv",
    element: <TV />,
  },
]);

export default router;