import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "../components/Layout/Layout";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Dealer from "../pages/Dealer/Dealer";
import Categories from "../pages/Category/Categories";
import Settings from "../pages/Setting/Settings";
import Notfound from "../pages/Notfound/Notfound";
import EditCategory from "../pages/Category/EditCategory";
import AddCategory from "../pages/Category/AddCategory";
import Products from "../pages/Product/Products";
import AddProduct from "../pages/Product/AddProduct";
import EditProduct from "../pages/Product/EditProduct";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import Detail from "../pages/Dealer/DealerDetail";
import Manufacturers from "../pages/Manufacturer/Manufacturers";
import AddManufacturer from "../pages/Manufacturer/AddManufacturer";
import EditManufacturer from "../pages/Manufacturer/EditManufacturer";
import ResetPassword from "../pages/Auth/ResetPassword";
import Profile from "../pages/Profile/Profile";
import ChangePassword from "../pages/Auth/ChangePassword";
import EditPlan from "../pages/Plans/EditPlan";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/forgot-password",
      element: <ForgotPassword />,
    },
    {
      path: "/reset-password",
      element: <ResetPassword />,
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
          path: "dealer/:id",
          element: <Detail />,
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
          path: "manufacturers",
          element: <Manufacturers />,
        },
        {
          path: "manufacturers/add",
          element: <AddManufacturer />,
        },
        {
          path: "manufacturers/edit/:id",
          element: <EditManufacturer />,
        },
        {
          path: "settings",
          element: <Settings />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "change-password",
          element: <ChangePassword />,
        },
        {
          path: "plans/edit",
          element: <EditPlan />,
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
