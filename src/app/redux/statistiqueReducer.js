const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const { Axios } = require("../../../lib/axios");

const fetchStatistique = createAsyncThunk(
  "statistique/fetch",
  async (empty, { fulfillWithValue, rejectWithValue }) => {
    try {
      const data = await Axios.get("/dashboard");
      return fulfillWithValue(data.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
const statistiqueSlice = createSlice({
  name: "statistique",
  initialState: {
    isLoading: false,
    err: undefined,
    statistique: {
      products: 0,
      lastProducts: 0,
      users: 0,
      lastUsers: 0,
      views: 0,
      profits: 0,
      lastProfits: 0,
      sales: 0,
      lastSales: 0,
      coupon: 0,
      lastCoupon: 0,
      restCoupon: 0,
      lastRestCoupon: 0,
      usedCoupon: 0,
      lastUsedCoupon: 0,
      couponSales:0,
      lastCouponSales:0,
      orders: 0,
      lastOrders: 0,
      likes: 0,
      lastLikes: 0,
      returns: 0,
      lastReturns: 0,
      reels: 0,
      lastReels: 0,
      comments: 0,
      lastComments: 0,
      viewsReels: 0,
      lastViewsReels: 0,
      isLoading: false,
      err: undefined,
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStatistique.fulfilled, ({ statistique }, { payload }) => {
        for (const key of Object.keys(statistique)) {
          statistique[key] = payload?.[key];
        }
      })
      .addCase(fetchStatistique.pending, ({ isLoading }) => {
        isLoading = true;
      })
      .addCase(fetchStatistique.rejected, ({ isLoading, err }, { error }) => {
        isLoading = false;
        err = error;
      });
  },
});
export { fetchStatistique };
export default statistiqueSlice.reducer;
