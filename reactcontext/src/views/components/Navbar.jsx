import React from "react";
import { ContextUse } from "../../contexts/AuthContext";

export default function Navbar({ pageName }) {
  const {user} = ContextUse()
  return (
    <nav className="d-flex align-items-center justify-content-between">
      <div className="header-page py-2 fw-bold">{pageName}</div>
      <div className="header-page py-2 fw-bold d-flex align-items-center gap-3"> <div className="profile"><img src={`default.png`} className="img-fluid rounded-circle " alt="" /></div> {user.username}</div>
    </nav>
  );
}
