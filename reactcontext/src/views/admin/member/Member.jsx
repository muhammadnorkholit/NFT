import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { env } from "../../../env";

export default function Member() {
  const [data, setData] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [message, setMessage] = useState(undefined);
  const [_filter, setFilter] = useState(undefined);
  useEffect(() => {
    fetch(env + "/member")
      .then((json) => json.json())
      .then((res) => setData(res[0].data));
    setTimeout(() => {
      setMessage(undefined);
    }, 3000);
  }, [message]);

  function handleFilter(e) {
    const { value } = e.target;
    setFilter(value);

    fetch(env + `/member${value ? "?filter=" + value : ""}`)
      .then((json) => json.json())
      .then((res) => {
        setData(res[0].data);
      });
  }
  function filter(e) {
    const { value } = e.target;
    fetch(env + `/member?q=` + value + (_filter ? `&filter=${_filter}` : ""))
      .then((json) => json.json())
      .then((res) => {
        setData(res[0].data);
      });
  }

  function updateStatus(data, status) {
    let confirs = confirm(
      `Apakah anda yakin mengubah status ${data.username}  ?`
    );
    if (confirs) {
      fetch(env + "/member/" + data.id, {
        method: "PUT",
        headers: {
          Accept: "Application/json",
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({ status: status }),
      })
        .then((json) => json.json())
        .then((res) => {
          console.log(res);
          setMessage(res.pesan);
        });
    }
  }
  return (
    <div>
      <h2 className="header-page fw-bold">Member</h2>
      {message && (
        <div className="alert alert-success text-center">{message}</div>
      )}
      <div className="mt-4 d-flex justify-content-end  mb-3">
        <select
          onChange={handleFilter}
          name="filter"
          className="w-25 me-2 form-control"
        >
          <option value="">Filter By status</option>
          <option value="active">Active</option>
          <option value="noactive">No Active</option>
          <option value="block">Block</option>
        </select>
        <input
          type="text"
          placeholder="Search by name  or email"
          name=""
          className="form-control w-25  "
          id=""
          onChange={filter}
        />
      </div>
      <div className="card border-0 shadow-sm  ">
        <div className="card-body p-0  overflow-auto d-block">
          <table className="table table-hover ">
            <thead>
              <tr>
                <th>No</th>
                <th>Username</th>
                <th>Email</th>
                <th>Created At</th>
                <th>Status</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.map((data, i) => {
                return (
                  <tr key={i} className="">
                    <td>{(i += 1)}</td>
                    <td>
                      <h6 className="td-main">{data.username}</h6>
                    </td>
                    <td>
                      <p>{data.email}</p>
                    </td>
                    <td>{data.created_at}</td>
                    <td>
                      <span
                        className={`  p-2  text-white rounded-circle ${
                          data.status == "active"
                            ? "ti-check bg-success"
                            : data.status == "block"
                            ? "ti-power-off bg-dark"
                            : "ti-close bg-danger"
                        }`}
                      ></span>
                    </td>
                    <td>
                      <div className="dropdown">
                        <button
                          className="btn btn-warning dropdown-toggle"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        ></button>
                        <ul className="dropdown-menu ">
                          <li className="active dropdown-item p-3">
                            <span className="ti-pencil-alt"></span> Edit Status
                          </li>
                          <li
                            style={{ cursor: "Pointer" }}
                            className="dropdown-item p-3"
                            onClick={() => updateStatus(data, "active")}
                          >
                            <span>Active</span>
                          </li>
                          <li
                            style={{ cursor: "Pointer" }}
                            className="dropdown-item p-3"
                            onClick={() => updateStatus(data, "noactive")}
                          >
                            <span>No Active</span>
                          </li>
                          <li
                            style={{ cursor: "Pointer" }}
                            className="dropdown-item p-3"
                            onClick={() => updateStatus(data, "block")}
                          >
                            <span>Block</span>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {data?.data?.length === 0 && (
                <tr>
                  <td colSpan={5}>Tidak Ada Data</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
