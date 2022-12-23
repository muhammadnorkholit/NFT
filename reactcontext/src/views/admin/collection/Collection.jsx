import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { env } from "../../../env";

export default function Collection() {
  const [data, setData] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [message, setMessage] = useState(undefined);
  const [_filter, setFilter] = useState(undefined);
  const [filterState, setFilterState] = useState(undefined);
  useEffect(() => {
    fetch(env + "/collection")
      .then((json) => json.json())
      .then((res) => setData(res));
    setTimeout(() => {
      setMessage(undefined);
    }, 3000);
  }, [message]);

  function handleFilter(e) {
    const { name, value } = e.target;
    setFilter({ ..._filter, [name]: value });
  }

  function onSubmit(e) {
    e.preventDefault();

    fetch(
      env +
        `/collection?category=` +
        (_filter?.category || "") +
        "&status=" +
        (_filter?.status || "")
    )
      .then((json) => {
        console.log(json);
        return json.json();
      })
      .then((res) => {
        console.log(res);
        setData(res);
      });
  }
  function filter(e) {
    const { value } = e.target;
    fetch(
      env +
        `/collection?q=` +
        value +
        (_filter?.category
          ? `&category=${_filter.category}`
          :""
          ? `&status=${_filter.status}`
          : "")
    )
      .then((json) => {
        console.log(json);
        return json.json();
      })
      .then((res) => {
        setData(res);
      });
  }

  function updateStatus(data, status) {
    let confirs = window.confirm(`Apakah anda yakin mengubah status ${data.title}  ?`);
    if (confirs) {
      fetch(env + "/collection/" + data.id, {
        method: "PUT",
        headers: {
          Accept: "Application/json",
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({ status: status }),
      })
        .then((json) => json.json())
        .then((res) => {
          setMessage(res.pesan);
        });
    }
  }
  return (
    <div>
      {message && (
        <div className="alert alert-success text-center">{message}</div>
      )}
      <h2 className="header-page fw-bold">collection</h2>
      <div className="mt-4 d-flex justify-content-end  mb-3">
        <button
          className="btn btn-light me-3 "
          data-bs-toggle="collapse"
          data-bs-target="#filter"
        >
          Filter
        </button>
        <input
          type="text"
          placeholder="Search By Name Item "
          name=""
          className="form-control w-25 "
          id=""
          onChange={filter}
        />
      </div>
      <div className="collapse navbar-collapse" id="filter">
        <form onSubmit={onSubmit}>
          <div className="d-flex jus gap-2 align-items-end">
            <div className="mb-3">
              <label htmlFor="">Category</label>
              <select
                onChange={handleFilter}
                name="category"
                className="me-2 form-control"
              >
                <option value="">Filter By Category</option>
                {data?.categories?.map((category, i) => (
                  <option key={i} value={`${category.title}`}>
                    {category.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="">Status</label>
              <select
                onChange={handleFilter}
                name="status"
                className="me-2 form-control"
              >
                <option value="">Filter By Status</option>
                <option value="active">Active</option>
                <option value="noactive">No Active</option>
                <option value="block">Block</option>
              </select>
            </div>
            <button type="submit" className=" mb-3 btn btn-primary">
              Filter
            </button>
          </div>
        </form>
      </div>
      <div className="card border-0 shadow-sm  ">
        <div className="card-body p-0">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>No</th>
                <th>Name Item</th>
                <th>Description</th>
                <th>Price</th>
                <th>Category</th>
                <th>Seller</th>
                <th>Created At</th>
                <th>Status</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.data?.map((data, i) => {
                return (
                  <tr key={i} className="">
                    <td>{(i += 1)}</td>
                    <td>
                      <h6 className="td-main m-0">{data.title}</h6>
                    </td>
                    <td>{data.description}</td>
                    <td>{data.price}</td>
                    <td>{data.name_category}</td>
                    <td>{data.username}</td>
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
                            className={`dropdown-item p-3 ${data.status == "active" && 'd-none' }`}
                            onClick={() => updateStatus(data, "active")}
                          >
                            <span>Active</span>
                          </li>
                          <li
                          
                            style={{ cursor: "Pointer" }}
                            className={`dropdown-item p-3 ${data.status == "noactive" && 'd-none' }`}
                            onClick={() => updateStatus(data, "noactive")}
                          >
                            <span>No Active</span>
                          </li>
                          <li
                          
                            style={{ cursor: "Pointer" }}
                            className={`dropdown-item p-3 ${data.status == "block" && 'd-none' }`}
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
              {data?.data?.data?.length === 0 && (
                <tr>
                  <td colSpan={9}>Tidak Ada Data</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="d-flex gap-3">
          {data?.data?.links.map((link, i) => (
            <button
              key={i}
              className={`btn-outline-primary btn ${
                link.active ? "active" : ""
              } `}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
