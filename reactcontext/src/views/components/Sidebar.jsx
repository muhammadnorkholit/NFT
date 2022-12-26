import React from "react";
import { ContextUse } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
export default function Sidebar() {
  const navi = useNavigate();
  const {isLogin} = ContextUse()
  
 function logout() {
  if (window.confirm("Anda akan logout?")) {
    
    localStorage.clear();
    window.location.href = '/login';
  }
}
  return (
    <div className="bg-dark h-100 rounded-2 p-3">
      <div className="header mb-4">
        <div className="text-white fw-bold text-center">OCEANPRIDE</div>
      </div>

      <ul className="nav-menu ">
        <li className="nav-item">
          <Link to="/admin" className="nav-link py-3  text-white">
            <span className="ti-home"></span> Dashoard
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/member" className="nav-link py-3  text-white ">
            <span className="ti-user"></span> Member
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/collection" className="nav-link py-3  text-white ">
            <span className="ti-view-grid"></span> Collection
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/transactions" className="nav-link py-3  text-white ">
            <span className="ti-view-grid"></span> Transaction
          </Link>
        </li>
      
        <li className="nav-item">
          <Link to="/admin/category" className="nav-link py-3  text-white ">
            <span className="ti-layout-list-thumb"></span> Category
          </Link>
        </li>
        <li className="nav-item" onClick={logout} >
          <Link className="nav-link py-3  text-white ">
            <span className="ti-close"></span> Logout
          </Link>
        </li>
      </ul>
    </div>
  );
}
