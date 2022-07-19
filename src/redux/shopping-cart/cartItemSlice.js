import { createSlice } from "@reduxjs/toolkit";
const items =
  localStorage.getItem("cartItems") !== null
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];
const initialState = {
  value: items,
};

const cartItemsSlide = createSlice({
  name: "cartItems",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      findItem(state.value, newItem).length
        ? (findItem(state.value, newItem)[0].quantity += newItem.quantity)
        : state.value.push(newItem);
      localStorage.setItem("cartItems", JSON.stringify(state.value));
    },
    increase: (state, action) => {
      state.value.find((item) => item.idv4 === action.payload).quantity += 1;
      localStorage.setItem("cartItems", JSON.stringify(state.value));
    },
    decrease: (state, action) => {
      let isItem = state.value.find(
        (item) => item.idv4 === action.payload
      ).quantity;
      isItem = isItem - 1 ? isItem - 1 : 1;
      state.value.find((item) => item.idv4 === action.payload).quantity =
        isItem;
      localStorage.setItem("cartItems", JSON.stringify(state.value));
    },
    removeItem: (state, action) => {
      state.value = state.value.filter((item) => item.idv4 !== action.payload);
      localStorage.setItem("cartItems", JSON.stringify(state.value));
    },
  },
});

const findItem = (arr, item) =>
  arr.filter(
    (e) =>
      e.slug === item.slug && e.color === item.color && e.size === item.size
  );

export const { addItem, removeItem, increase, decrease, caculator } =
  cartItemsSlide.actions;

export default cartItemsSlide.reducer;

/* import { createSlice } from "@reduxjs/toolkit";
const items = localStorage.getItem('cartItems') !== null ? JSON.parse(localStorage.getItem('cartItems')) : []


const initialState = {
  value: items,
  amount: 0,
  totalPrice: 0,
};

const cartItemsSlide = createSlice({
  name: "cartItems",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;

      const duplicate = findItem(state.value, newItem);

      if (duplicate.length > 0) {
        state.value = delItem(state.value, newItem);
        state.value = [
          ...state.value,
          {
            ...newItem,
            id: duplicate[0].id,
            quantity: newItem.quantity + duplicate[0].quantity,
          },
        ];
      } else {
        state.value = [
          ...state.value,
          {
            ...newItem,
            id:
              state.value.length > 0
                ? state.value[state.value.length - 1].id + 1
                : 1,
          },
        ];
      }
          localStorage.setItem("cartItems", JSON.stringify(sortItems(state.value)));
          console.log(state.value);
      
    },
    updateItem: (state, action) => {
      const newItem = action.payload;
      const item = findItem(state.value, newItem);
      if (item.length > 0) {
        state.value = delItem(state.value, newItem);
        state.value = [
          ...state.value,
          {
            ...newItem,
            id: item[0].id,
          },
        ];
      }
      localStorage.setItem("cartItems", JSON.stringify(sortItems(state.value)));
    },
    removeItem: (state, action) => {
      const item = action.payload;
      state.value = delItem(state.value, item);

      localStorage.setItem("cartItems", JSON.stringify(sortItems(state.value)));
    },
  },
});

const findItem = (arr, item) =>
  arr.filter(
    (e) =>
      e.slug === item.slug && e.color === item.color && e.size === item.size
  );

const delItem = (arr, item) =>
  arr.filter(
    (e) =>
      e.slug !== item.slug 
  );

const sortItems = (arr) =>
  arr.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0));

export const { addItem, removeItem, updateItem} = cartItemsSlide.actions;

export default cartItemsSlide.reducer; */
