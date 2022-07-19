import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {  removeItem, increase, decrease } from "../redux/shopping-cart/cartItemSlice";

const CartItem = (props) => {
    const dispatch = useDispatch();
  const [item, setItem] = useState(props.item);
  const [quantity, setquantity] = useState(props.item.quantity);

 const  updateQuantity = (type)=>{
    if(type === '+'){
        dispatch(increase(item.idv4))
    }
    if(type === '-'){
      dispatch(decrease(item.idv4))
    }
  }
const handleRemoveItem = ()=>{
    dispatch(removeItem(item.idv4))
}
  useEffect(() => {
    setItem(props.item);
    setquantity(props.item.quantity);
  }, [props.item]);

  return (
    <div className="cart__item">
      <div className="cart__item__image">
        <img src={item.product.image01} alt="" />
      </div>
      <div className="cart__item__info">
        <div className="cart__item__info__name">
          <Link to={`/catalog/${item.slug}`}>
            {`${item.product.title} - ${item.color} - ${item.size}`}
          </Link>
        </div>
        <div className="cart__item__info__price">{item.price}</div>
        <div className="cart__item__info__quantity">
          <div className="product__info__item__quantity">
            <div className="product__info__item__quantity__btn">
              <i className="bx bx-minus" onClick={()=>updateQuantity('-')}></i>
            </div>
            <div className="product__info__item__quantity__input">
              {quantity}
            </div>
            <div className="product__info__item__quantity__btn">
              <i className="bx bx-plus" onClick={()=>updateQuantity('+')}></i>
            </div>
          </div>
        </div>
        <div className="cart__item__del" onClick={handleRemoveItem}>
          <i className="bx bx-trash"></i>
        </div>  
      </div>
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default CartItem;
