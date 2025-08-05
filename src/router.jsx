import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Meetings from "./pages/Meetings";
import Schedule from "./pages/Schedule";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "meetings", element: <Meetings /> },
      { path: "schedule", element: <Schedule /> },
    ]
  }
]);

export default router;
