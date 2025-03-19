import React from "react";
import Layout from "../../components/Layouts/Layout";
import UserMenu from "../../components/Layouts/UserMenu";
import { useAuth } from "../../Context/auth";

const Dashboard = () => {
  const [auth] = useAuth();

  return (
    <div>
      <Layout title={"Dashboard - Ecommerce App"}>
        <div className="container-fluid m-3 p-3">
          <div className="row">
            <div className="col-md-3">
              <UserMenu />
            </div>
            <div className="col-md-9">
              <div className="card w-75 p-3">
                {/* Optional chaning: */}
                <h3> User Name: {auth.user.name}</h3>
                <h3> user Email: {auth.user.email}</h3>
                <h3>User Address: {auth.user.address}</h3>
              </div>
            </div>
          </div>
        </div>{" "}
      </Layout>
    </div>
  );
};

export default Dashboard;
