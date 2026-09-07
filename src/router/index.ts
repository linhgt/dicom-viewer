import { createBrowserRouter } from "react-router";

import ViewerPage from "../pages/viewer";

const router = createBrowserRouter([
  {
    path: "/",
    Component: ViewerPage,
  },
]);

export default router;
