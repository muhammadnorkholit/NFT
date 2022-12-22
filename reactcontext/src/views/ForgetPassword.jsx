import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { env } from '../env';

export default function ForgetPassword() {
    const [error, setError] = useState(undefined);
    const [message, setMessage] = useState(undefined);
    const [field, setField] = useState(undefined);
    const [valid, setValid] = useState(false);



    function onField(e) {
        const { name, value } = e.target;
        setField({ ...field, [name]: value });
      }

    
      function onSubmit(e) {
        e.preventDefault()
        const formData = new FormData()
        formData.append("email",field.email)
        fetch(env+"/forget",{
            method:"POST",
           body:formData
        }).then(json=>json.json()).then(res=>
            {console.log(res);
                if (res.status ==200) {
                    setValid(true)
                }
                if (res.status ==401) {
                    setValid(false)
                    setMessage(res.pesan)
                }
            })
        
      }
      function onSubmit2(e) {
        e.preventDefault()
        const formData = new FormData()
        formData.append("email",field.email)
        formData.append("newPassword",field.newPassword)
        fetch(env+"/forget",{
            method:"POST",
           body:formData
        }).then(json=>json.json()).then(res=>
            {
                console.log(res);
                if (res.status ==200) {
                    setValid(true)
                }
                if (res.status ==401) {
                    setValid(false)
                    setMessage(res.pesan)
                }
            })
        
      }


      if (valid) {
        return  <div className="card border-0 auth login m-auto ">
        <div className="card-header text-center">
          <h4>Password baru</h4>
        </div>
        {message && (
          <div className="alert alert-danger text-center">{message}</div>
        )}
        <div className="card-body">
          <form onSubmit={onSubmit2} action="">
            <div className="mb-3">
              <input
                type="text"
                className="form-control rounded-pill "
                name="newPassword"
                onChange={onField}
                placeholder="Password baru"
                required={true}
               
              />
              {error?.email && (
                <small className="text-danger">{error?.email}</small>
              )}
            </div>
         
            <button type="submit" className="btn btn-primary w-100 rounded-pill">
              Send
            </button>
          </form>
        </div>
      </div>
      }

  return (
    <div className="card border-0 auth login m-auto ">
    <div className="card-header text-center">
      <h4>Input your email</h4>
    </div>
    {message && (
      <div className="alert alert-danger text-center">{message}</div>
    )}
    <div className="card-body">
      <form onSubmit={onSubmit} action="">
        <div className="mb-3">
          {/* <label htmlFor="">email</label> */}
          <input
            type="text"
            className="form-control rounded-pill "
            name="email"
            onChange={onField}
            placeholder="Email addres"
            required={true}
           
          />
          {error?.email && (
            <small className="text-danger">{error?.email}</small>
          )}
        </div>
     
        <button type="submit" className="btn btn-primary w-100 rounded-pill">
          Send
        </button>
      </form>
    </div>
  </div>
  )
}
