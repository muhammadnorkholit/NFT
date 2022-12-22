import React, { useEffect, useState } from "react";
import NavbarDepan from "./components/NavbarDepan";
import { useParams } from "react-router-dom";
import { env } from "./../env";
export default function Detail() {
  const param = useParams();
  const [data, setData] = useState(undefined);

  useEffect(() => {
    fetch(env + "/beranda/" + param.id)
      .then((json) => json.json())
      .then((res) => {
        if (res.status === 200) setData(res.data);
      });
  }, []);

  return (
    <div>
      <NavbarDepan />
      <div className="container">
        <div className="row g-5 justify-content-between py-5">
          <div className="col-md-6">
            <img
              src={data?.imageUrl}
              className="detail-img"
              alt=""
            />
          </div>
          <div className="col-md-6">
            <div className="card ">
              <div className="card-body">
                <div className="card-title">
                  <h5 className="fw-semibold fs-3 mb-4">{data?.title}</h5>
                </div>
                <div className="icon d-flex justify-content-between">
                  <div className="category">
                    <span className="ti-home"></span> {data?.categories?.title}
                  </div>
                </div>
                <p>{data?.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
