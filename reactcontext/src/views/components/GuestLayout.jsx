import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import NavbarDepan from "./NavbarDepan";

export default function GuestLayout() {
  return (
    <div className="d-flex flex-column justify-content-between min-vh-100 ">
      <div>
        <NavbarDepan />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
