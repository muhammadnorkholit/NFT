import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ContextUse } from "../../contexts/AuthContext";
import { env } from "../../env";
export default function NavbarDepan() {
  const navi = useNavigate();
  const [search, setSearch] = useState("");
  const [data, setData] = useState(undefined);
  const { user } = ContextUse();
  function doSearch(e) {
    e.preventDefault();
    navi("/search", { state: { params: search } });
  }
  function logout() {
    if (window.confirm("Anda akan logout?")) {
      
      localStorage.clear();
      window.location.href = '/';
    }
  }
  useEffect(()=>{
    fetch(env+"/categories").then(json=>json.json()).then(res=>setData(res.data));
  },[])




  return (
    <nav className="navbar  navbar-expand-lg  navbar-light shadow-sm   bg-white py-3">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          OCENAPRIDE
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar"
          aria-controls="navbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbar">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item ">
              <Link
                className="nav-link active "
              >
              </Link>
            
            </li>
         {data?.map((d,i)=>  {
          if (i < 5) {
            return <li key={i} className="nav-item ">
            <Link
            to={`/categories/`+d.title}
              className=" text-capitalize nav-link active "
            >
              {d.title}
            </Link>
          
          </li>
          }
         })}
          </ul>
          <form onSubmit={doSearch} className="ms-auto">
            <input
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              name="search"
              id=""
              style={{ width: "20rem" }}
              className="form-control px-4   rounded-pill"
              placeholder="Search items or category  "
            />
          </form>
          <div className="ms-md-3 d-flex align-items-center gap-3">
            {user ? (
            <>
              <Link
                className="nav-link active profile"
                aria-current="page"
                to=""
              >
                <img src={`${user.imageUrl}`} className=" rounded-circle " alt="" />
              </Link>
              <button onClick={logout} className="btn btn-primary ">
              Logout
            </button></>
            ) : (
              <Link to={"/login"} className="btn btn-primary ">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
