import React, { useEffect, useState } from "react";
import Layout from "../components/Layouts/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Checkbox, Radio } from "antd";
import Prices from "../components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/cart";
const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      toast.error(error);
    }
  };
  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  const loadMore = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getAllCategories = async () => {
    try {
      const res = await axios.get("/api/v1/category/get-category");
      if (res.data?.success) {
        setCategories(res?.data?.allCategory);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllCategories();
    getTotal();
  }, []);
  const handleFilter = async (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  const getAllProducts = async () => {
    try {
      const res = await axios.get(`/api/v1/product/product-list/${page}`);
      setProducts(res.data.products);
    } catch (error) {
      toast.error("Error In Getting Products!!");
    }
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);
  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <Layout title={"All Products - Best Offers"}>
      {/* <div className="container back"></div> */}
      <div className="row mt-2 back">
        <div className="col-md-2 mt-4">
          <h4 className="ms-3 mb-3">Filter By Category</h4>
          <div className="d-flex flex-column ms-3">
            {categories.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
                <hr />
              </Checkbox>
            ))}
          </div>

          <h4 className="mt-4 ms-3 mb-3">Filter By Price</h4>
          <div className="d-flex flex-column ms-3 ">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                  <hr />
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column ">
            <button
              className="btn btn-danger bg-danger border-danger ms-3 mt-4 w-50 px-0"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
        </div>
        <div className="col-md-10 mt-2">
          {/* {JSON.stringify(radio, null, 4)} */}
          <h1 className="text-center">All Products</h1>
          <div className="d-flex  flex-wrap  ">
            {products.map((p) => (
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
                      className="card-link text-white p-2 btn-primary rounded"
                      onClick={() => {
                        navigate(`/product/${p.slug}`);
                      }}
                    >
                      More Details
                    </button>
                    <button
                      className="card-link text-white p-2 bg-secondary rounded "
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
          <div>
            {products && products.length < total && (
              <button
                className=" border-warning btn ms-1  bg-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading" : "Loadmore"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
