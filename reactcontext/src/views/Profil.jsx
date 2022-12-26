import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { env, env1 } from "../env";

export default function Profil() {
  const {username} = useParams()
  const [profil,setProfil] = useState(undefined)
  const [items,setItems] = useState(undefined)

  useEffect(() => {
    fetch(env+"/profil/"+username).then(json=>json.json()).then(res=>{
    setProfil(res.profil)
    setItems(res.items)
    })
  }, [])

  return <div className="min-vh-100">
       <div className='min-vh-100'>
        <img className='img-fluid w-100 category-banner'  
         onError={(e) => {
            e.target.onError = null;
            e.target.src = profil.imageUrl;
          }} src={env1+"/image/"+profil?.imageUrl} alt="" 
          />
          <div className="container py-4">
          <h1 className='fw-bold display-5 text-capitalize'>{profil?.username}</h1>
            <span>Total items {items?.length}</span>
            <p className='col-lg-8 mb-5'>{profil?.description}</p>
           

          <h3 className='fw-bold  text-capitalize'>Your Items</h3>
            <div className="row g-3">
          {items?.map(item=>{
            
            return    <div className="card border-0 shadow-sm  ">
            <div className="card-body p-0  overflow-auto d-block">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Name Item</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Created At</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {items?.map((item, i) => {
                    return (
                      <tr key={i} className="">
                        <td>{(i += 1)}</td>
                        <td>
                          <h6 className="td-main m-0">{item.title}</h6>
                        </td>
                        <td>{item.description}</td>
                        <td>{item.price}</td>
                        <td>{item.name_category}</td>
                        <td>{item.created_at}</td>
                        <td>
                          <span
                            className={`  p-2  text-white rounded-circle ${
                              item.status == "active"
                                ? "ti-check bg-success"
                                : item.status == "block"
                                ? "ti-power-off bg-dark"
                                : "ti-close bg-danger"
                            }`}
                          ></span>
                        </td>
                  
                      </tr>
                    );
                  })}
                  {items.length === 0 && (
                    <tr>
                      <td colSpan={9}>Tidak Ada Data</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="d-flex gap-3">
              
            </div>
          </div>
          })}
            </div>
          </div>
    
    </div>
  </div>;
}
