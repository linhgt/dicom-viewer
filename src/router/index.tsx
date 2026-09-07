import { createBrowserRouter, Navigate } from "react-router-dom";

import ViewerPage from "../pages/viewer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/viewer" replace />,
  },
  {
    path: "/viewer",
    Component: ViewerPage,
  },
]);

export default router;
