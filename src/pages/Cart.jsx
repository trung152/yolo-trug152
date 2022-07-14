import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import productData from "../assets/fake-data/products";
import Button from "../components/Button";
import CartItem from "../components/CartItem";
import Helmet from "../components/Helmet";

const Cart = () => {
  const cartItems = useSelector((state) => state.cartItems.value);

  const [cartProduct, setcartProduct] = useState([]);

  const [totalProducts, settotalProducts] = useState(0);

  const [totalPrice, settotalPrice] = useState(0);

  useEffect(() => {
    setcartProduct(productData.getCartItemsInfo(cartItems));
    settotalPrice(
      cartItems.reduce((total, item) => {
        return total + Number(item.price) * Number(item.quantity);
      }, 0)
    );
    settotalProducts(
      cartItems.reduce((total, item) => total + Number(item.quantity), 0)
    );
  }, [cartItems]);

  return (
    <div className="container">
      <div className="main">
        <Helmet title='Cart'>
          <div className="cart">
            <div className="cart__info">
              <div className="cart__info__txt">
                <p>Bạn đang có {totalProducts} sản phẩm trong giỏ hàng</p>
                <div className="cart__info__txt__price">
                  <span>Thành tiền : </span>
                  <span>{totalPrice}</span>
                </div>
              </div>
              <div className="cart__info__btn">
                <Button size="block">đặt hàng</Button>
                <Link to="/catalog">
                  <Button size="block">Tiếp tục mua hàng</Button>
                </Link>
              </div>
            </div>
            <div className="cart__list">
              {cartProduct.map((item, index) => { return <CartItem key={index} item={item}/> })
                }
            </div>
          </div>
        </Helmet>
      </div>
    </div>
  );
};

export default Cart;
