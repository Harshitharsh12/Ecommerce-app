import React, { useState } from "react";
import Layout from "../../components/Layouts/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  //form function:
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // toast.success("Register Successfully");
      const res = await axios.post("/api/v1/auth/register", {
        name,
        email,
        password,
        phone,
        address,
        answer,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!!");
    }
  };
  return (
    <Layout title={"Ecommerce App - Register page"}>
      <div className="Auth-box">
        <h1 className="header">REGISTER FORM:</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              type="text"
              className="form-control"
              id="exampleInputName1"
              placeholder="Enter Name"
              required
            />
          </div>
          <div className="form-group">
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
          <div className="form-group">
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              required
            />
          </div>
          <div className="form-group">
            <input
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              type="number"
              className="form-control"
              id="exampleInputPhone1"
              placeholder="Enter Phone"
              required
            />
          </div>
          <div className="form-group">
            <input
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              type="text"
              className="form-control"
              id="exampleInputAddress1"
              placeholder="Enter Address"
              required
            />
          </div>
          <div className="form-group">
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
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input "
              id="exampleCheck1"
              required
            />
            <label className="form-check-label" for="exampleCheck1">
              Check me out
            </label>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};
export default Register;
