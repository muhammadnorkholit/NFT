import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { ContextUse } from "../../contexts/AuthContext";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
export default function DashboardLayout() {
  const { isLogin } = ContextUse();
  if (!isLogin) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="container-fluid  ">
      <div className="row py-4 px-2 min-vh-100">
        <aside className="col-md-2">
          <Sidebar />
        </aside>
        <main className="col-md-10">
          <Navbar pageName={"Dashboard"} />
          <Outlet />
        </main>
      </div>
    </div>
  );
}
