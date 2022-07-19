import { createSelector } from '@reduxjs/toolkit'
import productData from '../assets/fake-data/products';

const productsList = productData.getAllProducts();

export const cartItemSelector = (state) => state.cartItems.value

export const categorySelector = (state) => state.catalog.category

export const colorSelector = (state) => state.catalog.color

export const sizeSelector = (state) => state.catalog.size



export const updateProduct = createSelector(
   categorySelector,
   colorSelector,
   sizeSelector,
   (category,color,size)=>{
      let temp = productsList;
    if (category.length > 0) {
      temp = temp.filter((e) => category.includes(e.categorySlug));
    }
    if (color.length > 0) {
      temp = temp.filter((e) => {
        const check = e.colors.find((colorItem) => color.includes(colorItem));
        return check !== undefined;
      });
    }
    if (size.length > 0) {
      temp = temp.filter((e) => {
        const check = e.size.find((sizeItem) => size.includes(sizeItem));
        return check !== undefined;
      });
    }
    return temp
   }

)





export const caculator = createSelector(
    cartItemSelector,
    (cartItems)=>{
       const totalPrice = cartItems.reduce((total, item) => {
            return total + Number(item.price) * Number(item.quantity);
          }, 0)

       const totalProducts = cartItems.reduce((total, item) => total + Number(item.quantity), 0)
          return {totalPrice,totalProducts}
    }
)