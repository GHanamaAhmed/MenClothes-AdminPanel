import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Axios } from "../../../lib/axios";
const fetchProductsStatistiques = createAsyncThunk(
  "ProductsStatistique",
  async (data, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await Axios.get("/products/statistique");
      return fulfillWithValue(res.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
const productsSlice = createSlice({
  name: "products",
  initialState: {
    statistique: {
      isLoading: false,
      err: undefined,
      products: 0,
      lastProducts: 0,
      likes: 0,
      lastLikes: 0,
      sales: 0,
      lastSales: 0,
      returns: 0,
      lastReturns: 0,
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchProductsStatistiques.fulfilled,
        ({ statistique }, { payload }) => {
          statistique.products = payload?.products;
          statistique.lastProducts = payload?.lastProducts;
          statistique.likes = payload?.likes;
          statistique.lastLikes = payload?.lastLikes;
          statistique.sales = payload?.sales;
          statistique.lastSales = payload?.lastSales;
          statistique.returns = payload?.returns;
          statistique.lastReturns = payload?.lastReturns;
        }
      )
      .addCase(fetchProductsStatistiques.pending, ({ statistique }) => {
        statistique.isLoading = true;
      })
      .addCase(
        fetchProductsStatistiques.rejected,
        ({ statistique }, { error }) => {
          statistique.err = error.message;
        }
      );
  },
});
export { fetchProductsStatistiques };
export default productsSlice.reducer;
