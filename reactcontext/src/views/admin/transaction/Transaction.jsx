import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { env } from "../../../env";

export default function Transaction() {
  const [data, setData] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [message, setMessage] = useState(undefined);
  const [_filter, setFilter] = useState(undefined);
  useEffect(() => {
    fetch(env + "/transaction")
      .then((json) => json.json())
      .then((res) => {
        setData(res.transaction)});

  }, [message]);

  
  return (
    <div>
      <h2 className="header-page fw-bold">Transactions</h2>
      {message && (
        <div className="alert alert-success text-center">{message}</div>
      )}
   
      <div className="card border-0 shadow-sm  ">
        <div className="card-body p-0  overflow-auto d-block">
          <table className="table table-hover ">
            <thead>
              <tr>
                <th>No</th>
                <th>Name Item</th>
                <th>Price</th>
                <th>Buyer</th>
                <th>Seller</th>
                <th>purchase date</th>
                
              </tr>
            </thead>
            <tbody>
              {data?.map((data, i) => {
                return (
                  <tr key={i} className="">
                    <td>{(i += 1)}</td>
                    <td>
                      <h6 className="td-main">{data.title}</h6>
                    </td>
                    <td>
                      <p>{data.price}</p>
                    </td>
                    <td>
                      <p>{data.buyer?.username}</p>
                    </td>
                    <td>
                    <p>{data.seller?.username}</p>
                    </td>
                    <td>{data.created_at}</td>
                  </tr>
                );
              })}
              {data?.length === 0 && (
                <tr>
                  <td colSpan={7}>Tidak Ada Data</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
