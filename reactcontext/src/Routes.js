import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "./views/components/DashboardLayout";
import Dashboard from "./views/admin/Dashboard";
import "./assets/bootstrap/css/bootstrap.css";
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
import SearchPage from "./views/searchPage";
import NotFound from "./views/NotFound";
import Profil from "./views/Profil";
import CategoryPage from "./views/CategoryPage";
import ForgetPassword from "./views/ForgetPassword";
import EditCategory from "./views/admin/category/EditCategory copy";
import Transaction from "./views/admin/transaction/Transaction";
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
        path: "/categories/:category",
        element: <CategoryPage />,
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
      {
        path: "/forget",
        element: <ForgetPassword />,
      },
      {
        path: "/login",
        element: <Login />,
      },

      {
        path: "/sign",
        element: <SignUp />,
      },
      {
        path: "/:username",
        element: <Profil />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
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
        path: "/admin/transactions",
        element: <Transaction />,
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
        path: "/admin/category/:id",
        element: <EditCategory />,
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
