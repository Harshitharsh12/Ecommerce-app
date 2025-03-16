import React, { useEffect, useState } from "react";
import Layout from "../components/Layouts/Layout";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useCart } from "../Context/cart";

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart, setCart] = useCart();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product//get-singleProduct/${params.slug}`
      );
      if (data) {
        setProduct(data.product);
        handleRelatedProduct(data?.product._id, data?.product.category._id);
      } else {
        toast.error("Error in getting More Details!!");
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };
  const handleRelatedProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-products/${pid}/${cid}`
      );
      if (data?.success) {
        setRelatedProducts(data?.products);
      } else {
        console.log("Error in getting Similar Products!!");
        toast.error("Error in getting Similar Products!!");
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };
  return (
    <Layout>
      <div className="row container product-details">
        <div className="col-md-5 ">
          <img
            src={`/api/v1/product/get-photo/${product._id}`}
            className="card-img-top w-75 h-100 "
            alt={product.name}
          />
        </div>
        <div className="col-md-7 d-flex h-75 mt-2 flex-column justify-content-center product-details-info">
          <h1 className="text-center ">Product Details:</h1>
          <hr />
          <h6>Name: {product.name}</h6>
          <hr />
          <h6>Description: {product.description}</h6>
          <hr />

          <h6>Price: {product.price}$</h6>
          <hr />

          <h6>Category: {product?.category?.name}</h6>
          <hr />

          <button
            class="card-link text-white p-2 bg-secondary rounded "
            onClick={() => {
              setCart([...cart, product]);
              toast.success("Item added to Cart!!");
            }}
          >
            ADD TO CART
          </button>
        </div>
      </div>
      <hr />
      <div className="row  container similar-products">
        {relatedProducts.length !== 0 ? <h4>Similar Products ➡️</h4> : ""}
        {relatedProducts.length !== 0 ? (
          <div className="d-flex flex-wrap">
            {relatedProducts?.map((p) => (
              <div
                className="card  m-2  ms-5 pt-2 d-flex  align-items-center"
                style={{ width: "22rem" }}
                key={p._id}
              >
                <img
                  className=" w-100  h-75 img-thumbnail img-fluid"
                  src={`/api/v1/product/get-photo/${p._id}`}
                  alt={p.name}
                />
                <div className="card-body  ">
                  <div className="d-flex ">
                    <h5 className="card-title me-5">{p.name}</h5>
                    <h5 className="card-text text-success ms-3">
                      ${p.price}.00
                    </h5>
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
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
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
        ) : (
          ""
        )}
      </div>
    </Layout>
  );
};

export default ProductDetails;
