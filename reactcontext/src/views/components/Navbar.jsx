import React from "react";

export default function Navbar({ pageName }) {
  return (
    <nav className="d-flex align-items-center justify-content-between">
      <div className="header-page py-2 fw-bold">{pageName}</div>
    </nav>
  );
}
