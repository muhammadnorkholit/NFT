import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "./views/components/DashboardLayout";
import Dashboard from "./views/admin/Dashboard";
import "./assets/bootstrap/css/bootstrap.css";
import "./assets/bootstrap/js/bootstrap.js";
import "./index.css";
import Login from "./views/Login";
import SignUp from "./views/SignUp";
import Beranda from "./views/Beranda";
import Category from "./views/admin/category/Category";
import CreateCategory from "./views/admin/category/CreateCategory";
import Member from "./views/admin/member/Member";
import "./assets/icon/demo-files/demo.css";
import "./assets/icon/themify-icons.css";
import "./assets/icon/ie7/ie7.css";
import Collection from "./views/admin/collection/Collection";
import GuestLayout from "./views/components/GuestLayout";
import Detail from "./views/Detail";
export const Routes = createBrowserRouter([
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/",
        element: <Beranda />,
      },
      {
        path: "/detail/:id",
        element: <Detail />,
      },
      {
        path: "/login",
        element: <Login />,
      },

      {
        path: "/sign",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "/admin",
    element: <DashboardLayout />,
    children: [
      {
        path: "/admin",
        element: <Dashboard />,
      },

      {
        path: "/admin/category",
        element: <Category />,
      },
      {
        path: "/admin/category/create",
        element: <CreateCategory />,
      },
      {
        path: "/admin/member",
        element: <Member />,
      },
      {
        path: "/admin/collection",
        element: <Collection />,
      },
    ],
  },
]);
