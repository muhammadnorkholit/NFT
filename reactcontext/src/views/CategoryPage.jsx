import React, { useEffect,useState } from 'react'
import {env, env1} from "./../env"
import { Link, useParams } from 'react-router-dom'
export default function CategoryPage() {
  const {category} = useParams()
  const [data,setData] = useState(undefined)

  useEffect(() => {
    fetch(env+"/categories/"+category).then(json=>json.json()).then(res=>setData(res.categoryData[0]))
     window.scrollTo(0, 0)
  }, [category])
  
  return (
    <div className='min-vh-100 py-5'>
        <img className='img-fluid w-100 category-banner'   onError={(e) => {
                            e.target.onError = null;
                            e.target.src = data.imageUrl;
                          }} src={env1+"/image/"+data?.imageUrl} alt="" />
          <div className="container py-4">
          <h1 className='fw-bold display-3 text-capitalize'>{data?.title}</h1>
            <span>Items {data?.items?.data?.length}</span>
            <p className='col-lg-8 mb-5'>{data?.description}</p>

            <h2 className='fw-bold mb-4'>Items</h2>

            <div className="row g-3">
              
              {data?.items?.data?.map(d=><div className="col-lg-3 col-md-4 col-sm-6 ">
                <Link to={"/detail/" + d.id}>
                <div className="card overflow-hidden border-0 category-item">
                         <div className="card-body">
                    <img
                          src={env1 + "/image/" + d.imageUrl}
                          className=" ratio rounded mb-2 " style={{aspectRatio:1/1}}
                          alt=""
                          onError={(e) => {
                            e.target.onError = null;
                            e.target.src = d.imageUrl;
                          }}
                        />
                          <h5 className="text-dark fs-5">{d.title}</h5>
                          <span className="text-dark">20 ETH</span>
                          <div className="d-flex  justify-content-between">
                            <small className="text-dark">Created by</small>
                            <small className="text-dark">{d.username}</small>
                          </div>
                        </div>
                </div>
                </Link>
              </div>
                )}
            </div>
          </div>
    
    </div>
  )
}
