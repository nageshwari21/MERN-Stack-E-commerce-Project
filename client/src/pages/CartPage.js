// src/pages/CartPage.js
import React from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useNavigate } from "react-router-dom";
import "../styles/CartStyles.css";

const CartPage = () => {
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item._id !== id));
  };

  const totalPrice = () => {
    return cart.reduce((sum, item) => sum + item.price, 0);
  };

  return (
    <Layout title="Cart">
      <div className="cart-container">
        <h2 className="cart-title">My Cart ({cart.length})</h2>

        {cart.length === 0 ? (
          <div className="cart-empty">
            <p>Your cart is empty</p>
            <button
              className="cart-continue-btn"
              onClick={() => navigate("/")}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            {cart.map((item) => (
              <div key={item._id} className="cart-card">
                <div className="row align-items-center">
                  <div className="col-md-3">
                    <img
                      src={`/api/v1/product/product-photo/${item._id}`}
                      alt={item.name}
                      className="cart-image"
                    />
                  </div>

                  <div className="col-md-6">
                    <h5 className="cart-product-name">
                      {item.name}
                    </h5>
                    <p className="cart-price">
                      ₹ {item.price}
                    </p>
                  </div>

                  <div className="col-md-3 text-end">
                    <button
                      className="cart-remove-btn"
                      onClick={() =>
                        removeFromCart(item._id)
                      }
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="cart-summary">
              <h4>
                Total: <span>₹ {totalPrice()}</span>
              </h4>
              <button
                className="cart-continue-btn"
                onClick={() => navigate("/")}
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default CartPage;
