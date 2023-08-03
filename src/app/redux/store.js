"use client"
import { configureStore } from "@reduxjs/toolkit";
import controlPanel from "./controlPanelReducer";
import products from "./productsReducer";
const store = configureStore({
  reducer: {
    controlPanel,
    products
  },
});
export {store}