import React from "react";
import "./CartItem.css";

const CartItem = (props) => {
  const { cartItem, cartKey } = props;

  const { product, amount } = cartItem;
  return (
    <div className="list">
      <br></br>
      <div>
        <div>{product.name}</div>
        <small>{`${amount} in cart`}</small>
      </div>
      <div
        className="media-right"
        onClick={() => props.removeFromCart(cartKey)}
      >
        <span className="delete is-medium"></span>
      </div>
    </div>
  );
};

export default CartItem;
