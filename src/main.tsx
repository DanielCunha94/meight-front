import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import Vehicles from "./routes/vehicles";
import Orders from "./routes/orders";
import Assignments from "@routes/assigments";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "vehicles",
        element: <Vehicles />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        index: true,
        element: <Assignments />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
