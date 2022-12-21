import React from "react";
import { Link } from "react-router-dom";
export default function Sidebar() {
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
          <Link to="/admin/category" className="nav-link py-3  text-white ">
            <span className="ti-layout-list-thumb"></span> Category
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
      </ul>
    </div>
  );
}
