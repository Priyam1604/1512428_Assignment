import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../request";

function Login() {
  const navigate = useNavigate();
  const [info, setInfo] = useState({ email: "", password: "", user: "" });
  const loginAreas = {
    admin: "/admin/semester",
    lecture: "/lecture/home",
    student: "/student/home",
  };
  const loginUser = async (event) => {
    event.preventDefault();
    const { ok, data } = await apiClient.get("auth/", info);

    if (!ok) {
      alert(data.error);
    }

    if (ok) {
      navigate(loginAreas[info.user]);
    }
  };
  const handleChange = ({ target: { value, name } }) => {
    let old = { ...info };
    old[name] = value;
    setInfo(old);
  };
  return (
    <div className="card container mt-5 col-md-4 shadow">
      <div className="card-body">
        <form onSubmit={loginUser}>
          <h1 className="mb-4">Login </h1>
          <div className="form-group ">
            <select
              required
              id="inputState"
              className="form-control"
              name="user"
              onChange={handleChange}
            >
              <option defaultValue>Choose User</option>
              <option value="admin">Admin</option>
              <option value="lecture">Lecture</option>
              <option value="student">Student</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              required
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              required
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
