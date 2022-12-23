import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { env, env1 } from "../env";

export default function Beranda() {
  const [data, setData] = useState(undefined);
  useEffect(() => {
    fetch(env + "/beranda")
      .then((json) => json.json())
      .then((res) => {
        setData(res);
      });
  }, []);

  return (
    <div>
      <main>
        <div className="mb-5">
          <div className="container">
            <div className="text-center mt-5">
              <h1 className="fw-bold text-dark mb-5">
                Explore, collect, and sell NFTs
              </h1>
            </div>
            <ul
              className="nav nav-tabs border-bottom border-2"
              id="myTab"
              role="tablist"
            >
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link bg-transparent border-0 text-dark   active"
                  id="home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#home"
                  type="button"
                  role="tab"
                  aria-controls="home"
                  aria-selected="true"
                >
                  <h3 className="fw-bold">Trending</h3>
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link bg-transparent border-0 text-dark  "
                  id="profile-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#profile"
                  type="button"
                  role="tab"
                  aria-controls="profile"
                  aria-selected="false"
                >
                  <h3 className="fw-bold">Top</h3>
                </button>
              </li>
            </ul>
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane fade show  active"
                id="home"
                role="tabpanel"
                aria-labelledby="home-tab"
              >
                <div
                  className="row flex-column  overflow-hidden mt-3  collection "
                  style={{ maxHeight: "80vh" }}
                >
                  {data?.trending?.map((trend, i) => (
                    <div
                      key={i}
                      className={`${
                        i > 5 ? "col-lg-6" : "col"
                      }  border-bottom mb-2  `}
                    >
                      <Link
                        to={"/detail/" + trend.id}
                        className="text-dark text-decoration-none "
                      >
                        <ul className="list-unstyled px-2 collection-item d-flex gap-3 align-items-center">
                          <li>
                            <h2 className="m-0">{(i += 1)}</h2>
                          </li>
                          <li>
                            <img
                              src={env1 + "/image/" + trend.imageUrl}
                              className="collection-img"
                              alt={trend.title}
                              onError={(e) => {
                                e.target.onError = null;
                                e.target.src = trend.imageUrl;
                              }}
                            />
                          </li>
                          <li>
                            <h6 className=" fw-bold m-0">{trend.title}</h6>
                          </li>
                          <li className="ms-auto fw-semibold">
                            {trend.price} ETH
                          </li>
                        </ul>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="profile"
                role="tabpanel"
                aria-labelledby="profile-tab"
              ></div>
            </div>
          </div>
        </div>
        <section>
          <div className="container">
            { data?.categoryCollect?.map((cat,i) => (
              
              <div key={i} className="row  flex-column collection-category align-items-start">
                <h3 className="text-dark fw-semibold text-capitalize ">
                  {console.log(cat.items.length)}
                {cat.items.length != 0 && cat.title}
                {cat.items.length != 0 &&    <hr
                    style={{
                      width: "10%",
                      borderWidth: "3px",
                      borderColor: "black",
                    }}
                  />}
               
                </h3>
                <div className="row overflow-hide  flex-nowrap py-lg-4 py-2 overflow-auto">
                  {cat.items.map((item,i) => (
                    <div key={i} className="col-lg-3 col-md-4 col-sm-6 col-11">
                       <Link to={"/detail/" + item.id}>
                      <div className="card border-0 overflow-hidden">
                        {console.log(cat.items)}
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
                      </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
