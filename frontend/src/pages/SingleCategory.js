import React, { useEffect, useState } from "react";
import Layout from "../components/Layouts/Layout";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useCart } from "../Context/cart";

const SingleCategory = () => {
  const [category, setCategory] = useState();
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    if (params?.slug) getPrductsByCat();
  }, [params?.slug]);
  const getPrductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <h1 className="text-center">Category - {category?.name}</h1>
      <h1 className="text-center">{products?.length} results found</h1>
      <div className="row d-flex justify-content-center">
        {products.map((p) => (
          <div
            className="card m-2 d-flex align-items-center pt-2"
            style={{ width: "20rem" }}
            key={p._id}
          >
            <img
              className=" w-75  h-75 "
              src={`/api/v1/product/get-photo/${p._id}`}
              alt={p.name}
            />
            <div className="card-body  ">
              <div className="d-flex ">
                <h5 className="card-title me-5">{p.name}</h5>
                <h5 className="card-text text-success ms-3">${p.price}.00</h5>
              </div>
              <p className="card-text text-info">
                {p.description.substring(0, 40)}...
              </p>
              <div className="d-flex justify-content-between ">
                <button
                  class="card-link text-white p-2 btn-primary rounded"
                  onClick={() => {
                    navigate(`/product/${p.slug}`);
                  }}
                >
                  More Details
                </button>
                <button
                  class="card-link text-white p-2 bg-secondary rounded "
                  onClick={() => {
                    setCart([...cart, p]);
                    localStorage.setItem("cart", JSON.stringify([...cart, p]));
                    toast.success("Item added to Cart!!");
                  }}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default SingleCategory;
