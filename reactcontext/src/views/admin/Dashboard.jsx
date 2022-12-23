import React, { useEffect, useState } from "react";
import { env } from "../../env";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [data, setData] = useState(undefined);

  useEffect(() => {
    fetch(env + "/dashboard")
      .then((json) => json.json())
      .then((res) => setData(res));
  }, []);
  return (
    <div className="mt-5">
      <div className="row g-lg-4 g-2">
        <div className="col-lg-3 col-md-4">
          <div className="card border-0 bg-warning card-dashboard shadow-sm">
            <div className="card-body d-flex align-items-center justify-content-between">
              <div className="d-flex gy-4 flex-column">
                <span className="bg-primary p-4 rounded-2 text-white">
                  {data?.assets}
                </span>
                <div className="card-title text-white">Collection</div>
              </div>
              <div className="card-icon text-white">
                <span className="ti-view-grid"></span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-4">
          <div className="card border-0 bg-danger card-dashboard shadow-sm">
            <div className="card-body d-flex align-items-center justify-content-between">
              <div className="d-flex gy-4 flex-column">
                <span className="bg-primary p-4 rounded-2 text-white">
                  {data?.member}
                </span>
                <div className="card-title text-white">Member</div>
              </div>
              <div className="card-icon text-white">
                <span className="ti-user"></span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-4">
          <div className="card border-0 bg-success card-dashboard shadow-sm">
            <div className="card-body d-flex align-items-center justify-content-between">
              <div className="d-flex gy-4 flex-column">
                <span className="bg-primary p-4 rounded-2 text-white">
                  {data?.categories}
                </span>
                <div className="card-title text-white">Category</div>
              </div>
              <div className="card-icon text-white">
                <span className="ti-layout-list-thumb"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
