import React from "react";
import Layout from "../components/Layouts/Layout";
import { useAuth } from "../Context/auth";
const Home = () => {
  const [auth, setAuth] = useAuth();
  return (
    <Layout>
      <h1>Home Page</h1>
      {auth.user != null ? (
        <>
          {" "}
          <pre>{JSON.stringify(auth, null, 4)}</pre>
        </>
      ) : (
        <> </>
      )}
    </Layout>
  );
};

export default Home;
