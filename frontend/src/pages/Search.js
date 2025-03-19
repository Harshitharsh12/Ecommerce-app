import React from "react";
import Layout from "../components/Layouts/Layout";
import { useSearch } from "../Context/search";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../Context/cart";
const Search = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();

  return (
    <Layout title={"Search products"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Resuts</h1>
          <h6>
            {values?.results.length === 0
              ? "No Products Found"
              : `Found ${values?.results.length} Products`}
          </h6>
          <div className="d-flex flex-wrap mt-4">
            {values?.results.map((p) => (
              <div
                className="card m-2 ms-1 pt-2 d-flex align-items-center"
                style={{ width: "18rem" }}
                key={p._id}
              >
                <img
                  className=" w-100  h-75"
                  src={`/api/v1/product/get-photo/${p._id}`}
                  alt={p.name}
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 40)}...
                  </p>
                  <p className="card-text">${p.price}</p>
                  <button
                    className="card-link text-white p-2 btn-primary rounded"
                    onClick={() => {
                      navigate(`/product/${p.slug}`);
                    }}
                  >
                    More Details
                  </button>
                  <button
                    className="card-link text-white p-2 bg-secondary rounded"
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
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
