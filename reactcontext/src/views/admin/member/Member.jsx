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
  }, []);

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

  function updateStatus(e) {
    const { value, name } = e.target;
    let confirms = confirm("Apakah anda yakin mengubah status ?");
    fetch(env + "/member/")
      .then((json) => json.json())
      .then((res) => setData(res[0].data));
  }
  return (
    <div>
      <h2 className="header-page fw-bold">Member</h2>
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
