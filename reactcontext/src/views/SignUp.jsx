import React, { useState } from "react";
import { ContextUse } from "./../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function SignUp() {
  const navi = useNavigate();
  const [error, setError] = useState(undefined);
  const [message, setMessage] = useState(undefined);
  const [field, setField] = useState(undefined);

  const { setUser } = ContextUse();
  function onField(e) {
    const { name, value } = e.target;
    setField({ ...field, [name]: value });
  }
  // navi("/admin")
  function onSubmit(e) {
    e.preventDefault();
    fetch("http://127.0.0.1:8000/api/signup", {
      method: "POST",
      headers: {
        Accept: "Application/json",
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(field),
    })
      .then((json) => json.json())
      .then((res) => {
        if (res?.status === 200) {
          setUser(res.user);
          setError(undefined);
          if (res.user.role == "admin") navi("/admin");
          if (res.user.role == "member") navi("/");
        }
        if (res?.status === 401) {
          setMessage(res.pesan);
          setError(undefined);
        }
        if (res?.errors) {
          setError(res.errors);
        }
      });
  }
  return (
    <div className="card border-0 auth sign m-auto ">
      <div className="card-header text-center">
        <h2>Sign</h2>
      </div>
      {message && (
        <div className="alert alert-danger text-center">{message}</div>
      )}
      <div className="card-body">
        <form onSubmit={onSubmit} action="">
          <div className="mb-3">
            <label htmlFor="">Username</label>
            <input
              type="text"
              className="form-control rounded-pill "
              name="username"
              placeholder="Username"
              onChange={onField}
              id=""
            />
            {error?.username && (
              <small className="text-danger">{error?.username}</small>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="">Email</label>
            <input
              type="email"
              className="form-control rounded-pill"
              name="email"
              placeholder="Email addres"
              onChange={onField}
              id=""
            />
            {error?.email && (
              <small className="text-danger">{error?.email}</small>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="">Password</label>
            <input
              type="password"
              className="form-control rounded-pill"
              name="password"
              placeholder="Password"
              onChange={onField}
              id=""
            />
            {error?.password && (
              <small className="text-danger">{error?.password}</small>
            )}
          </div>
          <button type="submit" className="btn btn-primary w-100 rounded-pill">
            Sign
          </button>
          <small className="text-center d-block pt-3  ">
            Already account,{" "}
            <Link to={"/login"} className="link-primary text-decoration-none">
              Login
            </Link>
          </small>
        </form>
      </div>
    </div>
  );
}
