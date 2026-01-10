import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/CartStyles.css";

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ============================
  // TOTAL PRICE
  // ============================
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.forEach((item) => {
        total += item.price * (item.quantity || 1);
      });
      return total.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      return "₹0";
    }
  };

  // ============================
  // REMOVE ITEM
  // ============================
  const removeCartItem = (pid) => {
    const myCart = cart.filter((item) => item._id !== pid);
    setCart(myCart);
    localStorage.setItem("cart", JSON.stringify(myCart));
    toast.success("Item removed");
  };

  // ============================
  // GET BRAINTREE TOKEN
  // ============================
  const getToken = async () => {
    try {
      const authData = JSON.parse(localStorage.getItem("auth"));

      const { data } = await axios.get(
        "/api/v1/product/braintree/token",
        {
          headers: {
            Authorization: `Bearer ${authData?.token}`,
          },
        }
      );

      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getToken();
  }, [auth?.token]);

  // ============================
  // HANDLE PAYMENT
  // ============================
  const handlePayment = async () => {
    try {
      if (!instance) return toast.error("Payment not ready");

      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const authData = JSON.parse(localStorage.getItem("auth"));

      await axios.post(
        "/api/v1/product/braintree/payment",
        { nonce, cart },
        {
          headers: {
            Authorization: `Bearer ${authData?.token}`,
          },
        }
      );

      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment successful");
    } catch (error) {
      console.log(error);
      toast.error("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Cart">
      <div className="cart-page">
        <h2 className="text-center">
          {auth?.user ? `Hello ${auth.user.name}` : "Hello Guest"}
        </h2>

        <div className="row">
          {/* CART */}
          <div className="col-md-7">
            {cart?.map((p) => (
              <div className="row card flex-row mb-2" key={p._id}>
                <div className="col-md-4">
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    alt={p.name}
                    width="100%"
                    height="130px"
                  />
                </div>
                <div className="col-md-4">
                  <p>{p.name}</p>
                  <p>₹ {p.price}</p>
                </div>
                <div className="col-md-4">
                  <button
                    className="btn btn-danger"
                    onClick={() => removeCartItem(p._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* SUMMARY */}
          <div className="col-md-5">
            <h3>Summary</h3>
            <h4>Total: {totalPrice()}</h4>

            {auth?.user?.address ? (
              <p>{auth.user.address}</p>
            ) : (
              <button
                className="btn btn-warning"
                onClick={() => navigate("/dashboard/user/profile")}
              >
                Add Address
              </button>
            )}

            {clientToken && cart?.length > 0 && (
              <>
                <DropIn
                  options={{ authorization: clientToken }}
                  onInstance={(inst) => setInstance(inst)}
                />

                <button
                  className="btn btn-primary"
                  onClick={handlePayment}
                  disabled={loading || !instance || !auth?.user?.address}
                >
                  {loading ? "Processing..." : "Pay Now"}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
