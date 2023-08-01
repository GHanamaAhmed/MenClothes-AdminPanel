"use client"
import { configureStore } from "@reduxjs/toolkit";
import controlPanel from "./controlPanelReducer";
const store = configureStore({
  reducer: {
    controlPanel,
  },
});
export {store}