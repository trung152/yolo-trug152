import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: [],
  color: [],
  size: [],
};

export const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: { 
    categoryRdc: (state, action) => {
      const item = action.payload;
      item.checked ? state.category.push(item.categorySlug) : state.category =  state.category.filter((e) => e !== item.categorySlug);
    },

    colorRdc : (state, action)=>{
      const item = action.payload;
      item.checked ? state.color.push(item.color) : state.color =  state.color.filter((e) => e !== item.color);
    },
    sizeRdc : (state, action)=>{
      const item = action.payload;
      item.checked ? state.size.push(item.size) : state.size =  state.size.filter((e) => e !== item.size);
    },
    clearRdc : (state,action)=>{
      state.category = [];
      state.color = [];
      state.size = []
  
    }
  },
});
export const { categoryRdc, colorRdc , sizeRdc ,clearRdc } = catalogSlice.actions;
export default catalogSlice.reducer;


  