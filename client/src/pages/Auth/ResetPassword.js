import React, { useState } from "react";
import Layout from "../../components/Layouts/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [email, setEmail] = useState();
  const [newPassword, setNewPassword] = useState();
  const [answer, setAnswer] = useState();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/forgot-password", {
        email,
        answer,
        newPassword,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong!!");
    }
  };
  return (
    <Layout title={"Ecommerce - Forget-Password Page"}>
      <div className="Auth-box ab">
        <h1 className="header ">PASSWORD RESET FORM:</h1>
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
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
              type="password"
              className="form-control"
              id="exampleInputNewPassword1"
              placeholder="Enter New Password"
              required
            />
          </div>
          <div className="form-group2">
            <input
              value={answer}
              onChange={(e) => {
                setAnswer(e.target.value);
              }}
              type="text"
              className="form-control"
              id="exampleInputAnswer1"
              placeholder="what is your favourite-food?"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Reset
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ResetPassword;
