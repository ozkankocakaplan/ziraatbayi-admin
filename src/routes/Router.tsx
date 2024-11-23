import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "../components/Layout/Layout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Dealer from "../pages/Dealer/Dealer";
import Adverts from "../pages/Advert/Adverts";
import Categories from "../pages/Category/Categories";
import Settings from "../pages/Setting/Settings";
import Notfound from "../pages/Notfound/Notfound";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "*",
      element: <Notfound />,
    },
    {
      path: "/admin",
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "dealers",
          element: <Dealer />,
        },
        {
          path: "ads",
          element: <Adverts />,
        },
        {
          path: "categories",
          element: <Categories />,
        },
        {
          path: "settings",
          element: <Settings />,
        },
      ],
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_normalizeFormMethod: true,
      v7_fetcherPersist: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);
export default function Router() {
  return <RouterProvider router={router} />;
}
