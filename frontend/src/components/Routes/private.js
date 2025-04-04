import React, { useEffect, useState } from "react";
import { useAuth } from "../../Context/auth";
import axios from "axios";
import Spinner from "../Spinner";
import { Outlet } from "react-router-dom";
const PrivateRoute = () => {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();
  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.post("/api/v1/auth/user-auth");
      if (res.data.ok) setOk(true);
      else setOk(false);
    };
    // if (auth?.token) authCheck();
    if (auth.token) authCheck();
    // }, [auth?.token]);
  }, [auth.token]);
  return ok ? <Outlet /> : <Spinner />;
};

export default PrivateRoute;
