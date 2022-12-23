import React, { useEffect,useState } from 'react'
import {env, env1} from "./../env"
import { useParams } from 'react-router-dom'
export default function CategoryPage() {
  const {category} = useParams()
  const [data,setData] = useState(undefined)

  useEffect(() => {
    fetch(env+"/categories/"+category).then(json=>json.json()).then(res=>setData(res.categoryData[0]))
  }, [category])
  
  return (
    <div className='min-vh-100'>
        <img className='img-fluid w-100 category-banner'   onError={(e) => {
                            e.target.onError = null;
                            e.target.src = data.imageUrl;
                          }} src={env1+"/image/"+data?.imageUrl} alt="" />
          <div className="container">
          <h1 className='fw-bold display-3'>{data?.title}</h1>
            <span>Items {data?.items?.data?.length}</span>
            <p className='col-lg-8 mb-5'>{data?.description}</p>

            <div className="row g-3">
              
              {data?.items?.data?.map(d=><div className="col-lg-3 col-md-4 col-sm-6 ">
                <div className="card overflow-hidden border-0 category-item">
                    <img
                          src={env1 + "/image/" + d.imageUrl}
                          className="category-item-img"
                          alt=""
                          onError={(e) => {
                            e.target.onError = null;
                            e.target.src = d.imageUrl;
                          }}
                        />
                         <div className="card-body">
                          <h5 className="text-dark fs-5">{d.title}</h5>
                          <span className="text-dark">20 ETH</span>
                          <div className="d-flex  justify-content-between">
                            <small className="text-dark">Created by</small>
                            <small className="text-dark">{d.username}</small>
                          </div>
                        </div>
                </div>
              </div>
                )}
            </div>
          </div>
    
    </div>
  )
}
