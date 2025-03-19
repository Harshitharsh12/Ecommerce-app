import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layouts/AdminMenu";
import Layout from "../../components/Layouts/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-products");
      if (data?.success) {
        setProducts(data.products);
        toast.success("All Products Fetched SuccessFully!!");
      } else {
        toast.error("Something Went Wrong !!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong In Getting Product!!");
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout title={"Dashboard - All Products"}>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products List</h1>
          <div>
            <div className="d-flex flex-wrap ">
              {products.map((p) => (
                <Link
                  key={p._id}
                  to={`/dashboard/admin/product/${p.slug}`}
                  className="product-link"
                >
                  <div
                    className="card m-2 ms-1 pt-2 d-flex align-items-center"
                    style={{ width: "20rem", height: "30rem" }}
                    key={p._id}
                  >
                    <img
                      className=" w-100 h-75"
                      src={`/api/v1/product/get-photo/${p._id}`}
                      alt={p.name}
                    />
                    <div className="card-body text-center">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text">
                        {p.description.substring(0, 40)}...
                      </p>
                      <p className="card-text">${p.price}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
