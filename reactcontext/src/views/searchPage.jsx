import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { env, env1 } from "../env";
import NavbarDepan from "./components/NavbarDepan";

export default function SearchPage() {
  const { state } = useLocation();
  const [data, setData] = useState(undefined);
  useEffect(() => {
    fetch(env + "/search?q=" + state?.params)
      .then((json) => json.json())
      .then((res) => setData(res.data));
  }, [state]);

  return (
    <div className="container mt-5">
      <h2 className="text-center fw-semibold">
        Search : {state?.params || "no key"}
      </h2>
      {data?.length === 0 && (
        <div className="text-center " style={{ marginTop: "9rem" }}>
          <h1 className="fw-bold">No Result 😢</h1>
          <p>try searching with different keywords</p>
        </div>
      )}
      <div className="row overflow-hide collection-category  flex-nowrap py-lg-4 py-2 overflow-auto">
        {data?.map((item) => (
          <div className="col-lg-3 col-md-4 col-sm-6 col-11">
      <Link to={`/detail/`+item.id}>
      <div className="card border-0 overflow-hidden">
              <img
                src={env1 + "/image/" + item.imageUrl}
                className="collection-category-img"
                alt=""
                onError={(e) => {
                  e.target.onError = null;
                  e.target.src = item.imageUrl;
                }}
              />
              <div className="card-body">
                <h5 className="text-dark fs-5">{item.title}</h5>
                <span className="text-dark">20 ETH</span>
                <div className="d-flex  justify-content-between">
                  <small className="text-dark">Created by</small>
                  <small className="text-dark">{item.username}</small>
                </div>
              </div>
            </div></Link>
          </div>
        ))}
      </div>
    </div>
  );
}
