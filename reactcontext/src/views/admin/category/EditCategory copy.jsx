import React, { useEffect, useState } from "react";
import { json, useNavigate, useParams } from "react-router-dom";
import { env } from "../../../env";

export default function EditCategory() {
  const navi = useNavigate();

  const [field, setField] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [data, setData] = useState(undefined);
  const [message, setMessage] = useState(undefined);

  const {id} = useParams()
  useEffect(()=>{
    fetch(env+"/category/"+id+"/edit").then(json=>json.json()).then(res=>setField(res.data))
  },[])
  function handleInput(e) {
    const { name, value } = e.target;
    setField({ ...field, [name]: value });
  }
  function handleFile(e) {
    const { name, files } = e.target;
    setField({ ...field, [name]: files?.[0] });
  }
  function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", field?.title);
   if (field?.image)  formData.append("image", field?.image);
    formData.append("description", field?.description);


    
    fetch(env + "/category/s/"+id, {
      method: 'post',
      // headers: { 'Content-Type': 'application/json' },
      body: formData,
    })
      .then((json) => {
        console.log(json);
        return json.json();
      })
      .then((res) => {
        console.log(res);
        if (res?.errors) setError(res.errors);
        if (res?.status == 401) setMessage(res.pesan);
        if (res?.status == 200) {
          navi("/admin/category");
          setMessage(json.pesan);
        }
      });
  }

  return (
    <div>
      <h2 className="header-page fw-bold">Add Category</h2>
      <div className="card border-0 mt-3">
        <div className="card-body">
          <form encType="multipart/form-data" onSubmit={onSubmit} action="">
            <div className="mb-3">
              <label htmlFor="">Name Category</label>
              <input
                onChange={handleInput}
                type="text"
                name="title"
                defaultValue={field?.title}
                placeholder="Name Category"
                id=""
                className="form-control"
              />
              {error?.title && (
                <small className="text-danger">{error?.title}</small>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="">Image</label>
              <input
                onChange={handleFile}
                type="file"
                name="image"
                id=""
                className="form-control"
              />
              {error?.image && (
                <small className="text-danger">{error?.image}</small>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="">Description Category</label>
              <textarea
                onChange={handleInput}
                type="text"
                defaultValue={field?.description}
                name="description"
                placeholder="Description Category"
                id=""
                className="form-control"
              />
              {error?.description && (
                <small className="text-danger">{error?.description}</small>
              )}
            </div>
            <button className="btn btn-primary">Save</button>
          </form>
        </div>
      </div>
    </div>
  );
}
