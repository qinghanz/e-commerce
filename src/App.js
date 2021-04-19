import React, { Component } from "react";
import { Switch, Route, Link, BrowserRouter as Router } from "react-router-dom";
import Cart from "./components/Cart";
import ProductList from "./components/ProductList";
import axios from "axios";
import "./App.css";

import Context from "./Context";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      cart: {},
      products: [],
    };
    this.routerRef = React.createRef();
  }

  async componentDidMount() {
    let cart = localStorage.getItem("cart");

    const products = await axios.get(
      "http://my-json-server.typicode.com/qinghanz/jsonserver/products"
    );

    cart = cart ? JSON.parse(cart) : {};

    this.setState({ products: products.data, cart });
  }

  checkout = () => {
    const cart = this.state.cart;

    const products = this.state.products.map((p) => {
      if (cart[p.name]) {
        axios.put(`http://localhost:3001/products/${p.id}`, { ...p });
      }
      return p;
    });

    this.setState({ products });
    this.clearCart();
  };

  addToCart = (cartItem) => {
    let cart = this.state.cart;
    if (cart[cartItem.id]) {
      cart[cartItem.id].amount += cartItem.amount;
    } else {
      cart[cartItem.id] = cartItem;
    }
    if (cart[cartItem.id].amount > cart[cartItem.id].product.stock) {
      cart[cartItem.id].amount = cart[cartItem.id].product.stock;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    this.setState({ cart });
  };

  removeFromCart = (cartItemId) => {
    let cart = this.state.cart;
    delete cart[cartItemId];
    localStorage.setItem("cart", JSON.stringify(cart));
    this.setState({ cart });
  };

  clearCart = () => {
    let cart = {};
    localStorage.removeItem("cart");
    this.setState({ cart });
  };

  render() {
    return (
      <Context.Provider
        value={{
          ...this.state,
          removeFromCart: this.removeFromCart,
          addToCart: this.addToCart,
          clearCart: this.clearCart,
          checkout: this.checkout,
        }}
      >
        <Router ref={this.routerRef}>
          <div className="App">
            <nav className="Header">
              <h1>MyBookStore</h1>

              <Link to="/products">
                <div className="Products">Books</div>
              </Link>

              {"  "}

              <Link to="/cart">
                <div className="Cart">
                  Cart: <span>{Object.keys(this.state.cart).length}</span>
                </div>
              </Link>
            </nav>
            <Switch>
              <Route exact path="/" component={ProductList} />
              <Route exact path="/cart" component={Cart} />
              <Route exact path="/products" component={ProductList} />
            </Switch>
          </div>
        </Router>
      </Context.Provider>
    );
  }
}
