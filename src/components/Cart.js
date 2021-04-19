import "./Cart.css";
import React from "react";
import withContext from "../withContext";
import CartItem from "./CartItem";

const Cart = (props) => {
  const { cart } = props.context;
  const cartKeys = Object.keys(cart || {});
  return (
    <>
      <div>
        <h4 className="title">My Cart</h4>
      </div>

      <br />
      {cartKeys.length ? (
        <div>
          {cartKeys.map((key) => (
            <CartItem
              cartKey={key}
              key={key}
              cartItem={cart[key]}
              removeFromCart={props.context.removeFromCart}
            />
          ))}
          <div>
            <br />
            <div className="buttons">
              <button onClick={props.context.clearCart}>Clear cart</button>{" "}
              <button onClick={props.context.checkout}>Checkout</button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div>No item in cart!</div>
        </div>
      )}
    </>
  );
};

export default withContext(Cart);
