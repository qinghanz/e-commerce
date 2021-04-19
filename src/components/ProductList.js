import React from "react";
import Item from "./Item";
import withContext from "../withContext";
import "./ProductList.css";

const ProductList = (props) => {
  const { products } = props.context;

  return (
    <>
      <h4 className="title">Our Books</h4>
      <div className="product__list">
        {products && products.length ? (
          products.map((product, index) => (
            <Item
              product={product}
              key={index}
              addToCart={props.context.addToCart}
            />
          ))
        ) : (
          <div>
            <span>No products found!</span>
          </div>
        )}
      </div>
    </>
  );
};

export default withContext(ProductList);
