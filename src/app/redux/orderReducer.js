import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Axios } from "../../../lib/axios";
const fetchOrdersStatistique = createAsyncThunk(
  "fetchOrdersStatistique",
  async (empty, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await Axios.get("/orders/statistique");
      return fulfillWithValue(res.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
const fetchOrders = createAsyncThunk(
  "fetchOrders",
  async ({ name, min, type }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await Axios.get(
        `/orders?min=${min || 0}&max=${min || 0 + 15}${
          name?.length > 0 ? `&name=${name}` : ""
        }${type?.length > 0 ? `&type=${type}` : ""}`
      );
      return fulfillWithValue(res.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
// const updateReel = createAsyncThunk(
//   "updateReel",
//   async (data, { fulfillWithValue, rejectWithValue }) => {
//     try {
//       const res = await Axios.put("/reels", data);
//       return fulfillWithValue(res.data);
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );
const removeOrder = createAsyncThunk(
  "removeOrder",
  async ({ id }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await Axios.put("/orders", { id, states: "removed" });
      return fulfillWithValue(res.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
const calculateStatus = (e, status) => {
  return e?.status.findIndex((el) => el?._id == status) >= 0
    ? e?.status[e?.status.findIndex((el) => el?._id == status)]?.count
    : 0;
};
const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    orders: {
      isLoading: false,
      err: undefined,
      orders: [],
    },
    statistique: {
      isLoading: false,
      err: undefined,
      orders: 0,
      lastOrders: 0,
      sales: 0,
      lastSales: 0,
      likes: 0,
      lastLikes: 0,
      returns: 0,
      lastReturns: 0,
    },
  },
  reducers: {
    updateStatus: ({ orders }, { payload }) => {
      orders.orders = [
        ...orders.orders.map((e) => {
          if (payload?.userId == e?.userId) {
            if (payload?._id == e?._id) {
              return {
                ...e,
                ...payload,
                accepted: calculateStatus(payload, "accepted"),
                rejected: calculateStatus(payload, "rejected"),
                completed: calculateStatus(payload, "completed"),
                pending: calculateStatus(payload, "pending"),
                cancelled: calculateStatus(payload, "cancelled"),
                return: calculateStatus(payload, "return"),
              };
            } else {
              return {
                ...e,
                accepted: calculateStatus(payload, "accepted"),
                rejected: calculateStatus(payload, "rejected"),
                completed: calculateStatus(payload, "completed"),
                pending: calculateStatus(payload, "pending"),
                cancelled: calculateStatus(payload, "cancelled"),
                return: calculateStatus(payload, "return"),
              };
            }
          }
          return e;
        }),
      ];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchOrdersStatistique.fulfilled,
        ({ statistique }, { payload }) => {
          statistique.orders = payload?.orders;
          statistique.lastOrders = payload?.lastOrders;
          statistique.likes = payload?.likes;
          statistique.lastLikes = payload?.lastLikes;
          statistique.sales = payload?.sales;
          statistique.lastSales = payload?.lastSales;
          statistique.returns = payload?.returns;
          statistique.lastReturns = payload?.lastReturns;
          statistique.isLoading = false;
        }
      )
      .addCase(fetchOrdersStatistique.pending, ({ statistique }) => {
        statistique.isLoading = true;
      })
      .addCase(
        fetchOrdersStatistique.rejected,
        ({ statistique }, { error }) => {
          statistique.err = error.message;
          statistique.isLoading = false;
        }
      )
      .addCase(fetchOrders.fulfilled, ({ orders }, { payload }) => {
        orders.isLoading = false;
        orders.orders = [
          ...payload.map((e) => {
            return {
              ...e,
              accepted: calculateStatus(e, "accepted"),
              rejected: calculateStatus(e, "rejected"),
              completed: calculateStatus(e, "completed"),
              pending: calculateStatus(e, "pending"),
              cancelled: calculateStatus(e, "cancelled"),
              return: calculateStatus(e, "return"),
            };
          }),
        ];
      })
      .addCase(fetchOrders.pending, ({ orders }) => {
        orders.isLoading = true;
      })
      .addCase(fetchOrders.rejected, ({ orders }, { error }) => {
        orders.err = error.message;
        orders.isLoading = false;
      })
      .addCase(
        removeOrder.fulfilled,
        ({ orders, statistique }, { payload }) => {
          orders.isLoading = false;
          orders.orders = [
            ...orders.orders.filter((e) => e?._id != payload?._id),
          ];
        }
      )
      .addCase(removeOrder.rejected, ({ orders }, { error }) => {
        orders.err = error.message;
        orders.isLoading = false;
      });
  },
});
const { updateStatus } = ordersSlice.actions;
export { fetchOrders, fetchOrdersStatistique, updateStatus, removeOrder };
export default ordersSlice.reducer;
