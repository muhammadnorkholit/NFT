import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { env } from "../env";

export default function Footer() {
  const [data, setData] = useState([])
    useEffect(()=>{
    fetch(env+"/categories").then(json=>json.json()).then(res=>setData(res.data));
  },[])
  return (
    <footer className="bg-dark p-3 mt-5 py-5">
     <div className="container">
       <div className="row g-5 ">
        <div className="col-lg-4">
          <h1 className="text-white">OCEAN</h1>
          <p className="text-white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
            possimus impedit voluptates aspernatur maxime, ipsa soluta, laborum
          </p>
        </div>
        <div className="col-auto">
          <h4 className="text-white">Categories</h4>
          
          {data.map((d,i)=> <Link key={i}
            to={`/categories/`+d.title}
              className=" mb-2 text-capitalize text-white nav-link  "
            >
              {d.title}
            </Link>)}
        </div>
        <div className="col-auto">
          <h4 className="text-white">Account</h4>
          <Link
            to={`/login`}
              className=" mb-2 text-capitalize text-white nav-link  "
            >
              Login
            </Link>
          <Link
            to={`/sign`}
              className=" mb-2 text-capitalize text-white nav-link  "
            >
              Create account
            </Link>
        </div>
        <div className="col-auto social-list">
          <h4 className="text-white">Social media</h4>
          <Link
            to={`/#`}
              className=" mb-2 text-capitalize text-white nav-link  "
            >
             <span className="ti-facebook"></span>  Facebook
            </Link>
          <Link
            to={`/#`}
              className=" mb-2 text-capitalize text-white nav-link  "
            >
            <span className="ti-instagram"></span> Instagram
            </Link>
          <Link
            to={`/#`}
              className=" mb-2 text-capitalize text-white nav-link  "
            >
           <span className="ti-linkedin"></span>  Linkedin
            </Link>
          <Link
            to={`/#`}
              className=" mb-2 text-capitalize text-white nav-link  "
            >
            <span className="ti-twitter-alt"></span> Twitter
            </Link>
          <Link
            to={`/#`}
              className=" mb-2 text-capitalize text-white nav-link  "
            >
            <span className="ti-youtube"></span> Youtube
            </Link>
        </div>
         <div className="col-auto">
          <h4 className="text-white">About us</h4>
          <p className="text-white mb-1 ">Oceanpride@gmail.com</p>
          <small className="text-white">Bondowoso, Jawa timur , Indonesia</small>
        
        </div>
      </div>
     </div>
    </footer>
  );
}
