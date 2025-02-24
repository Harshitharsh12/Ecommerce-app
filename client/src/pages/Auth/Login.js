import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import Layout from "../../components/Layouts/Layout";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      if (res.data.success) {
        setAuth({ ...auth, user: res.data.user, token: res.data.token });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
        window.alert("Click on OK for Login!!");
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!!");
    }
  };

  return (
    <div>
      <Layout title={"Ecommerce App - Login Page"}>
        <div className="Auth-box ab">
          <h1 className="header ">LOGIN FORM:</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group2">
              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Enter Email"
                required
              />
            </div>
            <div className="form-group2">
              <input
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                className="form-control"
                id="exampleInputName1"
                placeholder="Enter Password"
                required
              />
            </div>
            <NavLink to="/resetPassword">Forget Password</NavLink>
            <button type="submit" class="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </Layout>
    </div>
  );
};

export default Login;
