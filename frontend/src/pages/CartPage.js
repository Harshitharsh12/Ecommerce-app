import React, { useState, useEffect } from "react";
import Layout from "../components/Layouts/Layout";
import { useCart } from "../Context/cart";
import { useAuth } from "../Context/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import DropIn from "braintree-web-drop-in-react";

const CartPage = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((p) => (total += p.price));
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };
  const removrCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
      toast.success("Remove from Cart!!");
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  //get payment gateway token:
  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);
  //handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      await axios.post("/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <Layout>
      <div className="containter">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {`Hello ${auth?.token && auth.user.name}`}
            </h1>
            <h4 className="text-center">
              {cart?.length > 0
                ? `You have ${cart.length} items in your cart ${
                    auth?.token ? "" : "please login to checkout!!"
                  }`
                : "Your Cart is Empty"}
            </h4>
          </div>
        </div>
        <div className="row  ms-5 ">
          <div className="col-md-6 container ">
            <h2 className=" mb-5 cart1 mt-2 sm-ms-2"> Cart Items </h2>
            {cart?.map((p) => (
              <div className="card  mb-2">
                <div className="row d-flex align-items-center">
                  <div className="col-md-4">
                    <img
                      className=" w-100 h-75"
                      src={`/api/v1/product/get-photo/${p._id}`}
                      alt={p.name}
                    />
                  </div>
                  <div className="col-md-8">
                    <h5>{p.name}</h5>
                    <p className="mt-3">{p.description.substring(0, 60)}...</p>
                    <p>${p.price}</p>
                    <button
                      className="rounded-2 px-2 text-white border border-danger border-5  bg-danger"
                      onClick={() => {
                        removrCartItem(p._id);
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="col-md-5 mt-2">
            <h2>Cart Summary</h2>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h4>Total : {totalPrice()} </h4>

            <div className="mb-3">
              {auth?.token ? (
                <div className="mb-3">
                  <h4>Current Address:</h4>
                  <h5>{auth.user.address}</h5>
                  <button
                    className="btn btn-outline-warning bg-warning border-warning w-25 ms-0 mt-2 text-white"
                    onClick={() =>
                      navigate("/dashboard/user/profile", { state: "/cart" })
                    }
                  >
                    Update Address
                  </button>
                </div>
              ) : (
                <button
                  className="btn btn-outline-warning text-white w-50 mt-2 p-1 ms-0 border-warning bg-warning"
                  onClick={() =>
                    navigate("/login", {
                      state: "/cart",
                    })
                  }
                >
                  Plase Login to checkout
                </button>
              )}
            </div>
            <div className="mt-2">
              {!clientToken || !auth?.token || !cart?.length ? (
                ""
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      // paypal: {
                      //   flow: "vault",
                      // },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />

                  <button
                    className="btn btn-primary ms-0 w-25 p-2"
                    onClick={handlePayment}
                    disabled={loading || !instance || !auth?.user?.address}
                  >
                    {loading ? "Processing ...." : "Make Payment"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
