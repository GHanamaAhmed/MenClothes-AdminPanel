import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Axios } from "../../../lib/axios";
const fetchProductsStatistiques = createAsyncThunk(
  "fetchProductsStatistique/products",
  async (data, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await Axios.get("/products/statistique");
      return fulfillWithValue(res.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
const fetchProducts = createAsyncThunk(
  "fetchProducts/products",
  async ({ name, min, type }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await Axios.get(
        `/products?min=${min || 0}&max=${min || 0 + 15}${
          name?.length > 0 ? `&name=${name}` : ""
        }${type?.length > 0 ? `&type=${type}` : ""}`
      );
      return fulfillWithValue(res.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
const deleteProducts = createAsyncThunk(
  "deleteProducts/products",
  async ({ id }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await Axios.delete(`/products`, { data: { id } });
      return fulfillWithValue(res.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: {
      products: [],
      types: [],
      isLoading: false,
      err: undefined,
    },
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
  reducers: {
    uploadProduct: ({ products, statistique }, { payload }) => {
      products.products = [...products.products, payload];
      products.types = [
        ...products.types.filter((e) => e != payload.type),
        payload.type,
      ];
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
          statistique.isLoading = false;
        }
      )
      .addCase(fetchProductsStatistiques.pending, ({ statistique }) => {
        statistique.isLoading = true;
      })
      .addCase(
        fetchProductsStatistiques.rejected,
        ({ statistique }, { error }) => {
          statistique.err = error.message;
          statistique.isLoading = false;
        }
      )
      .addCase(fetchProducts.fulfilled, ({ products }, { payload }) => {
        products.products = [...payload.products];
        products.types = [...payload.types];
        products.isLoading = false;
      })
      .addCase(fetchProducts.pending, ({ products }) => {
        products.isLoading = true;
      })
      .addCase(fetchProducts.rejected, ({ products }, { error }) => {
        products.err = error.message;
        products.isLoading = false;
      })
      .addCase(
        deleteProducts.fulfilled,
        ({ products, statistique }, { payload }) => {
          products.products = [
            ...products.products.filter((e) => e._id != payload._id),
          ];
        }
      )
      .addCase(deleteProducts.rejected, ({ products }, { error }) => {
        products.err = error.message;
      });
  },
});
const { uploadProduct } = productsSlice.actions;
export {
  fetchProductsStatistiques,
  fetchProducts,
  deleteProducts,
  uploadProduct,
};
export default productsSlice.reducer;
