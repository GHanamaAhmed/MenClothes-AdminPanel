"use client"
import { configureStore } from "@reduxjs/toolkit";
import controlPanel from "./controlPanelReducer";
import products from "./productsReducer";
import reels from "./reelsReducer";
import orders from "./orderReducer"
const store = configureStore({
  reducer: {
    controlPanel,
    products,
    reels,
    orders
  },
});
export {store}