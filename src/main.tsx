import "./index.css";

import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { StateProvider } from "~/components/state";

import { App } from "./app";

const router = createBrowserRouter([
  {
    path: "/*",
    element: (
      <StateProvider>
        <App />
      </StateProvider>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
