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
import EditCategory from "../pages/Category/EditCategory";
import AddCategory from "../pages/Category/AddCategory";
import Products from "../pages/Product/Products";
import AddProduct from "../pages/Product/AddProduct";
import EditProduct from "../pages/Product/EditProduct";

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
          path: "products",
          element: <Products />,
        },
        {
          path: "products/add",
          element: <AddProduct />,
        },
        {
          path: "products/edit/:id",
          element: <EditProduct />,
        },
        {
          path: "categories",
          element: <Categories />,
        },
        {
          path: "categories/add",
          element: <AddCategory />,
        },
        {
          path: "categories/edit/:id",
          element: <EditCategory />,
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
