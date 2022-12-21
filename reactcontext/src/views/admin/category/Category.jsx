import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { env, env1 } from "../../../env";

export default function Category() {
  const [data, setData] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [message, setMessage] = useState(undefined);
  useEffect(() => {
    fetch(env + "/category")
      .then((json) => json.json())
      .then((res) => setData(res[0].data));
  }, []);

  function filter(e) {
    const { value } = e.target;
    fetch(env + "/category?q=" + value)
      .then((json) => json.json())
      .then((res) => {
        setData(res[0].data);
      });
  }

  return (
    <div>
      <h2 className="header-page fw-bold">Category</h2>
      <div className="mt-4 d-flex justify-content-between mb-3">
        <Link to={"/admin/category/create"} className="btn btn-primary">
          <span className="ti-plus"></span> Add Category
        </Link>
        <input
          type="text"
          placeholder="Search By Name Category"
          name=""
          className="form-control w-25 "
          id=""
          onChange={filter}
        />
      </div>
      <div className="card border-0 shadow-sm  ">
        <div className="card-body p-0">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>No</th>
                <th>Name Category</th>
                <th>Desctiption Category</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.map((data, i) => {
                return (
                  <tr key={i} className="">
                    <td>{(i += 1)}</td>

                    <td>
                      <h6 className="td-main">{data.title}</h6>
                    </td>
                    <td>
                      <p>{data.description}</p>
                    </td>
                    <td>
                      <div className="d-flex gap-1">
                        <button className="btn btn-warning btn-action d-flex align-items-center justify-content-center me-2">
                          <span className="ti-pencil-alt"></span>
                        </button>
                        <button className="btn btn-success btn-action d-flex align-items-center justify-content-center me-2">
                          <span className="ti-info-alt"></span>
                        </button>
                        <button className="btn btn-danger btn-action d-flex align-items-center justify-content-center ">
                          <span className="ti-trash"></span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {data?.data?.length === 0 && (
                <tr>
                  <td colSpan={4}>Tidak Ada Data</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
