import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { env } from "./../env";
export default function Detail() {
  const param = useParams();
  const [data, setData] = useState(undefined);

  useEffect(() => {
    fetch(env + "/beranda/" + param.id)
      .then((json) => json.json())
      .then((res) => {
        if (res.status === 200) setData(res.data);
      });
  }, []);

  return (
    <div>
      <div className="container">
        <div className="row g-5 justify-content-between py-5">
          <div className="col-md-6">
            <img
              src={data?.imageUrl}
              className="detail-img"
              alt=""
            />
            <div className="card d-sm-block d-none mt-4">
              <div className="card-body p-3">
                <p>
                  {data?.description} Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Quod excepturi, iure saepe possimus cumque
                  nostrum nulla odit totam facilis? Natus dolorem, autem porro
                  dignissimos, voluptatum praesentium expedita alias earum
                  reiciendis aliquid ab esse harum. Esse, blanditiis error?
                  Aliquam sit eos ad doloremque dolorem possimus illo est
                  accusantium delectus eligendi laborum dolorum ipsam
                  perferendis facere dicta illum sapiente odit quaerat,
                  doloribus facilis quas libero deleniti! Nisi quibusdam
                  architecto sequi aspernatur aperiam. Molestias laudantium
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <article className="card ">
              <div className="card-body">
                <div className="card-title">
                  <h5 className="fw-semibold fs-3 mb-4">{data?.title}</h5>
                </div>
                <div className="icon d-flex justify-content-between">
                  <div className="category">
                    <span className="ti-home"></span> {data?.categories?.title}
                  </div>
                </div>
                <hr />
                <h5>Price {data?.price}</h5>
                <div className="d-flex gap-2 mt-4">
                  <button className="fs-5 w-100 btn btn-primary rounded-pill">
                    Buy
                  </button>
                  <button className="fs-5 w-100 btn btn-outline-primary rounded-pill">
                    Add to cart
                  </button>
                </div>
              </div>
            </article>
            <article className="card mt-4">
              <div className="card-body p-3">
                <p>
                  {data?.description} Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Quod excepturi, iure saepe possimus cumque
                  nostrum nulla odit totam facilis? Natus dolorem, autem porro
                  dignissimos, voluptatum praesentium expedita alias earum
                  reiciendis aliquid ab esse harum. Esse, blanditiis error?
                  Aliquam sit eos ad doloremque dolorem possimus illo est
                  accusantium delectus eligendi laborum dolorum ipsam
                  perferendis facere dicta illum sapiente odit quaerat,
                  doloribus facilis quas libero deleniti! Nisi quibusdam
                  architecto sequi aspernatur aperiam. Molestias laudantium
                </p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}
