import React, { useRef , useEffect } from "react";
import Helmet from "../components/Helmet";
import category from "../assets/fake-data/category";
import colors from "../assets/fake-data/product-color";
import size from "../assets/fake-data/product-size";
import CheckBox from "../components/CheckBox";
import Button from "../components/Button";
import InfinityList from "../components/InfinityList";
import { useDispatch, useSelector } from "react-redux";
import { categoryRdc, colorRdc, sizeRdc , clearRdc } from "../redux/catalog/catalogSlice";
import {
  updateProduct,
  categorySelector,
  colorSelector,
  sizeSelector,
} from "../redux/selector";


const Catalog = () => {
  const categorySlt = useSelector(categorySelector);
  const colorSlt = useSelector(colorSelector);
  const sizeSlt = useSelector(sizeSelector);
  // const dataProduct = useSelector((state) => state.catalog.value);
  const product = useSelector(updateProduct);
  const dispatch = useDispatch();
  const filterRef = useRef(null);

  const showHideFilter = () => {
    filterRef.current.classList.toggle("active");
  };

  const clearFilter = ()=>{
    dispatch(clearRdc())
  }

 useEffect(()=>{
  dispatch(clearRdc())
 },[])
  return (
    <div className="container">
      <div className="main">
        <Helmet title="Sản phẩm">
          <div className="catalog">
            <div className="catalog__btn__filter">
              <Button size="sm" onClick={showHideFilter}>
                {" "}
                Bộ lọc
              </Button>
            </div>
            <div className="catalog__filter" ref={filterRef}>
              <div className="catalog__filter__widget ">
                <div
                  className="catalog__filter__widget__btn"
                  onClick={showHideFilter}
                >
                  <i className="bx bx-left-arrow-alt"></i>
                </div>
                <div className="catalog__filter__widget__title">
                  danh mục sản phẩm
                </div>
                <div className="catalog__filter__widget__content">
                  {category.map((item, index) => (
                    <div
                      className="catalog__filter__widget__content__item"
                      key={index}
                    >
                      <CheckBox
                        label={item.display}
                        onChange={
                          (input) =>
                            dispatch(
                              categoryRdc({
                                categorySlug: item.categorySlug,
                                checked: input.checked,
                              })
                            )
                        }
                        checked={categorySlt.includes(item.categorySlug)}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="catalog__filter__widget">
                <div className="catalog__filter__widget__title">màu sắc</div>
                <div className="catalog__filter__widget__content">
                  {colors.map((item, index) => (
                    <div
                      className="catalog__filter__widget__content__item"
                      key={index}
                    >
                      <CheckBox
                        label={item.display}
                        onChange={
                          (input) =>
                            dispatch(
                              colorRdc({
                                color: item.color,
                                checked: input.checked,
                              })
                            )
                        }
                        checked={colorSlt.includes(item.color)}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="catalog__filter__widget">
                <div className="catalog__filter__widget__title">kích cỡ</div>
                <div className="catalog__filter__widget__content">
                  {size.map((item, index) => (
                    <div
                      className="catalog__filter__widget__content__item"
                      key={index}
                    >
                      <CheckBox
                        label={item.display}
                        onChange={(input) =>
                          dispatch(
                            sizeRdc({
                              size: item.size,
                              checked: input.checked,
                            })
                          )
                        }
                        checked={sizeSlt.includes(item.size)}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="catalog__filter__widget">
                <div className="catalog__filter__widget__content">
                  <Button size="sm" onClick={clearFilter}>
                    xóa bộ lọc
                  </Button>
                </div>
              </div>
            </div>
            <div className="catalog__content">
              <InfinityList data={product} />
            </div>
          </div>
        </Helmet>
      </div>
    </div>
  );
};

export default Catalog;
