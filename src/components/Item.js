import React from "react";
import "./Item.css";

const Item = (props) => {
  const { product } = props;
  return (
    <div>
      <b className="title">
        <br></br>
        <div className="item">{product.name}</div>
        <div className="price">${product.price}</div>
      </b>

      <div>{product.shortDesc}</div>

      <div>
        <button
          className="addToCartButton"
          onClick={() =>
            props.addToCart({
              id: product.name,
              product,
              amount: 1,
            })
          }
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Item;
