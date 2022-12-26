import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { env, env1 } from "../env";

export default function Beranda() {
  const [data, setData] = useState(undefined);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch(env + "/beranda")
      .then((json) => json.json())
      .then((res) => {
        setData(res);
      });
       fetch(env+"/categories").then(json=>json.json()).then(res=>setCategories(res.data));
  }, []);
 
  return (
    <div>
      <main>
          <section className="hero mb-5">
              <div className="container min-vh-100 d-flex align-items-center">
                <div className="row align-items-center flex-md-row flex-column-reverse ">
                  <div className="col-md-6">
                  <h1 className="fw-bold display-3 text-dark mb-2">
                Explore, <span className="fw-bolder text-primary">collect</span>, and sell <span className="fw-bolder text-primary">NFTs</span>
              </h1>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque consequuntur, animi harum nemo eius sunt dicta commodi ut? Id atque nihil facere</p>
              <Link to={`/login`} className="btn btn-dark ">Join with us</Link>
                    </div>
                <div className=" col-md-6">
                <img src="hero.png" alt="" className="img-fluid" />
                </div>
              </div>
              </div>
          </section>
        <section className="bg-dark py-5">
          <div className="container ">
              <h2 className="text-white mb-5 text-center">Categories</h2>
           <div className="row g-3 flex-md-wrap flex-nowrap overflow-hide overflow-auto">
              {categories?.map((category,i)=>
               <div className="col-lg-3 col-8">
               <Link  key={i}
            to={`/categories/`+category.title}
              className="  text-capitalize nav-link active "
            >
               <div  className="card p-3 bg-secondary category-list border-0">
                <h5 className="text-white  text-capitalize text-center">{category.title}</h5>
                <p className="text-white text-center text-oriant" >{category.description}</p>
              </div>
            </Link>
             </div>
             )}
           </div>
          </div>
        </section>
        <section>
          <div className="container">
            { data?.categoryCollect?.map((cat,i) => (
              <div key={i} className="row  flex-column align-items-start">
                <h3 className="text-dark fw-semibold text-capitalize ">
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
                    <div key={i} className="col-lg-3 col-md-4 col-sm-6 col-8">
                       <Link to={"/detail/" + item.id}>
                      <div className="card border-0 overflow-hidden">
                        <div className="card-body">
                        <img
                          src={env1 + "/image/" + item.imageUrl}
                           className=" ratio rounded mb-2 " style={{aspectRatio:1/1}}
                          alt=""
                          onError={(e) => {
                            e.target.onError = null;
                            e.target.src = item.imageUrl;
                          }}
                        />
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
