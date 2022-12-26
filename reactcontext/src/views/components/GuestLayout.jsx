import React from "react";
import { Link, Outlet } from "react-router-dom";
import Footer from "../Footer";
import NavbarDepan from "./NavbarDepan";

export default function GuestLayout() {
const toTop = ()=>{
 window.scrollTo({top:0, behavior:"smooth"});
}
  return (
    <div className="d-flex flex-column justify-content-between min-vh-100 ">
      <div>
        <NavbarDepan />
        <Outlet />
      </div>
      <button onClick={toTop} className="to-top">
        <span className="ti-angle-up"></span>
      </button>
      <div className="left-panel p-3 rounded">
         <a
            href={`https://www.facebook.com/`}
              className=" mb-2 text-capitalize text-dark nav-link  "
            >
             <span className="ti-facebook"></span> 
            </a>
          <Link
            to={`/#`}
              className=" mb-2 text-capitalize text-dark nav-link  "
            >
            <span className="ti-instagram"></span> 
            </Link>
          <Link
            to={`/#`}
              className=" mb-2 text-capitalize text-dark nav-link  "
            >
           <span className="ti-linkedin"></span>  
            </Link>
          <Link
            to={`/#`}
              className=" mb-2 text-capitalize text-dark nav-link  "
            >
            <span className="ti-twitter-alt"></span> 
            </Link>
          <Link
            to={`/#`}
              className=" mb-2 text-capitalize text-dark nav-link  "
            >
            <span className="ti-youtube"></span> 
            </Link>
      </div>
      <Footer />
    </div>
  );
}
