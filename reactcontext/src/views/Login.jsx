import React, { useState } from "react";
import { ContextUse } from "./../contexts/AuthContext";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { env } from "../env";

export default function Login() {
  const navi = useNavigate();
  const [error, setError] = useState(undefined);
  const [message, setMessage] = useState(undefined);
  const [field, setField] = useState(undefined);
  const {isLogin} = ContextUse()

  if (isLogin) {
    return <Navigate to={"/admin"} />;
  }

  const { setUser } = ContextUse();
  function onField(e) {
    const { name, value } = e.target;
    setField({ ...field, [name]: value });
  }

  function onSubmit(e) {
    e.preventDefault();
    fetch(env + "/login", {
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
          if (res.user.role == "admin")
            navi("/admin", { state: { isLogin: true } });
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
    <div className="card border-0 auth login m-auto ">
      <div className="card-header text-center">
        <h2>Login</h2>
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
              onChange={onField}
             
            />
            {error?.username && (
              <small className="text-danger">{error?.username}</small>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="">Password</label>
            <input
              type="password"
              className="form-control rounded-pill"
              name="password"
              onChange={onField}
             
            />
            {error?.password && (
              <small className="text-danger">{error?.password}</small>
            )}
          </div>
          <button type="submit" className="btn btn-primary w-100 rounded-pill">
            Login
          </button>
          <small className="text-center d-block pt-3  ">
            Don't have account,{" "}
            <Link to={"/sign"} className="link-primary text-decoration-none">
              sign up
            </Link>
          </small>
        </form>
      </div>
    </div>
  );
}
