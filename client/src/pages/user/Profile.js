import React, { useEffect, useState } from "react";
import Layout from "../../components/Layouts/Layout";
import UserMenu from "../../components/Layouts/UserMenu";
import { useAuth } from "../../Context/auth";
import toast from "react-hot-toast";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Profile = () => {
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const { name, email, phone, address } = auth?.user;
    setName(name);
    setEmail(email);
    setPhone(phone);
    setAddress(address);
  }, [auth?.user]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put("/api/v1/auth/profile", {
        name,
        email,
        password,
        phone,
        address,
      });
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
        navigate(location.state);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title={"Ecommerce App - Your Profile"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="Auth-box">
              <h1 className="header">UPDATE FORM:</h1>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    type="text"
                    className="form-control text-white bg-secondary"
                    placeholder="Enter Name"
                  />
                </div>
                <div className="form-group">
                  <input
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    type="email"
                    className="form-control text-secondary"
                    placeholder="Enter Email"
                    disabled
                  />
                </div>
                <div className="form-group">
                  <input
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    type="password"
                    className="form-control  text-white bg-secondary"
                    placeholder=" Enter Password"
                  />
                </div>
                <div className="form-group">
                  <input
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                    type="number"
                    className="form-control  text-white bg-secondary"
                    placeholder="Enter Phone"
                  />
                </div>
                <div className="form-group">
                  <input
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                    type="text"
                    className="form-control text-white bg-secondary
"
                    placeholder="Enter Address"
                  />
                </div>

                <button type="submit" className="btn btn-primary mt-1 mb-2 ">
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
