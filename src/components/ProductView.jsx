import React from "react";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addItem } from "../redux/shopping-cart/cartItemSlice";
import { v4 as uuidv4 } from 'uuid';
const ProductView = (props) => {
  const dispatch = useDispatch();

  let product = props.product;

  if (product === undefined)
    product = {
      title: "",
      price: "",
      image01: null,
      image02: null,
      categorySlug: "",
      colors: [],
      slug: "",
      size: [],
      description: "",
    };
  const [previewImg, setPreviewImg] = useState(product.image01);

  const [descriptionExpand, setDescriptionExpand] = useState(true);

  const [descriptionContent, setDescriptionContent] = useState(
    product.description.slice(0, 500)
  );

  const [color, setColor] = useState(undefined);
  const [size, setSize] = useState(undefined);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const toggleDescription = () => {
    setDescriptionExpand(!descriptionExpand);
    descriptionExpand
      ? setDescriptionContent(descriptionContent.slice(0, 500))
      : setDescriptionContent(product.description);
  };

  useEffect(() => {
    setColor(undefined);
    setSize(undefined);
    setQuantity(1);
    setPreviewImg(product.image01);
    setDescriptionExpand(false);
  }, [product]);

  const updateQuantity = (type) => {
    if (type === "plus") {
      setQuantity(quantity + 1);
    }
    if (type === "minus") {
      setQuantity(quantity <= 1 ? 1 : quantity - 1);
    }
  };

  const check = () => {
    if (color === undefined) {
      alert("Vui lòng chọn màu sắc");
      return false;
    }
    if (size === undefined) {
      alert("Vui lòng chọn kích cỡ");
      return false;
    }

    return true;
  };
   const addToCart = () => {
    if (check()) {
      let newItem = {
        idv4 : uuidv4(),
        slug: product.slug,
        color: color,
        size: size,
        price: product.price,
        quantity: quantity,
      };
      
      if (dispatch(addItem(newItem))) {
        alert("Success");
      } else {
        alert("Fail");
      }
    }
  };

  const goToCart = () => {
    if (check()) {
      dispatch(
        addItem({
            slug: product.slug,
            color: color,
            size: size,
            price: product.price,
            quantity: quantity,
        })
      );
      navigate("/cart");
    }
  };
  return (
    <div className="product">
      <div className="product__images">
        <div className="product__images__list">
          <div
            className="product__images__list__item"
            onClick={() => setPreviewImg(product.image01)}
          >
            <img src={product.image01} alt="" />
          </div>
          <div
            className="product__images__list__item"
            onClick={() => setPreviewImg(product.image02)}
          >
            <img src={product.image02} alt="" />
          </div>
        </div>
        <div className="product__images__main">
          <img src={previewImg} alt="" />
        </div>
        <div className={`product-description `}>
          <div className="product-description__title">Chi tiết sản phẩm</div>
          <div
            className="product-description__content"
            dangerouslySetInnerHTML={{ __html: descriptionContent }}
          ></div>
          <div className="product-description__toggle">
            {/*   <Button size='sm' onClick={()=>setDescriptionExpand(!descriptionExpand)}> 
                    { descriptionExpand ? 'Thu gọn ' : 'Xem thêm'}
                </Button> */}
            <span onClick={toggleDescription}>
              {descriptionExpand ? " Thu gọn" : " Xem Thêm  "}
            </span>
          </div>
        </div>
      </div>
      <div className="product__info">
        <h1 className="product__info__title">{product.title}</h1>
        <div className="product__info__item">
          <span className="product__info__item__price">{product.price}</span>
        </div>
        <div className="product__info__item">
          <div className="product__info__item__title">Màu sắc</div>
          <div className="product__info__item__list">
            {product.colors.map((item, index) => (
              <div
                key={index}
                className={`product__info__item__list__item ${
                  color === item ? "active" : ""
                }`}
                onClick={() => setColor(item)}
              >
                <div className={`circle bg-${item}`}></div>
              </div>
            ))}
          </div>
        </div>
        <div className="product__info__item">
          <div className="product__info__item__title">Kích cỡ</div>
          <div className="product__info__item__list">
            {product.size.map((item, index) => (
              <div
                key={index}
                className={`product__info__item__list__item ${
                  size === item ? "active" : ""
                }`}
                onClick={() => setSize(item)}
              >
                <div className={`product__info__item__list__item-size `}>
                  {item}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="product__info__item">
          <div className="product__info__item__title">Số lượng</div>
          <div className="product__info__item__quantity">
            <div
              className="product__info__item__quantity__btn"
              onClick={() => updateQuantity("minus")}
            >
              <i className="bx bx-minus"></i>
            </div>
            <div className="product__info__item__quantity__input">
              {quantity}
            </div>
            <div
              className="product__info__item__quantity__btn"
              onClick={() => updateQuantity("plus")}
            >
              <i className="bx bx-plus"></i>
            </div>
          </div>
        </div>
        <div className="product__info__item">
          <Button onClick={addToCart}>Thêm vào giỏ</Button>
          <Button onClick={goToCart}>Mua ngay</Button>
        </div>
      </div>
    </div>
  );
};

ProductView.propTypes = {
  product: PropTypes.object,
};

export default ProductView;
