import React from "react";
import Layout from "../components/Layouts/Layout";

const Pagenotfound = () => {
  return (
    <Layout title={"Go-Back Page Not Found"}>
      <div className="pnf">
        <h1 className="head">404</h1>
        <p className="para">Oops! Page Not Found</p>
        <button className="btn">Go Back</button>
      </div>
    </Layout>
  );
};

export default Pagenotfound;
