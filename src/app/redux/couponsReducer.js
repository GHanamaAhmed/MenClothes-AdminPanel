import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Axios } from "../../../lib/axios";
import { toasty } from "../components/toast";
const fetchCoupon = createAsyncThunk(
  "fetchCoupon",
  async (
    { min, reverse, used, expire, name },
    { fulfillWithValue, rejectWithValue }
  ) => {
    try {
      const res = await Axios.get(
        `/coupon?min=${min || 0}&max=${min || 0 + 6}${
          name?.length > 0 ? `&name=${name}` : ""
        }${expire !== "" ? `&expire=${expire}` : ""}${
          used !== "" ? `&used=${used}` : ""
        }${reverse ? `&reverse=${reverse}` : ""}`
      );
      return fulfillWithValue(res.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
const addCoupon = createAsyncThunk(
  "addCoupon",
  async (data, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await Axios.post("/coupon/addCoupon", data);
      return fulfillWithValue(res.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
const removeCoupon = createAsyncThunk(
  "removeCoupon",
  async ({ id }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await Axios.delete("/coupon", { data: { id } });
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
const couponSlice = createSlice({
  name: "coupon",
  initialState: {
    coupon: {
      isLoading: false,
      err: undefined,
      coupon: [],
    },
  },
  reducers: {
    updateStatus: ({ coupon }, { payload }) => {
      coupon.coupon = [
        ...coupon.coupon.map((e) => {
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
      .addCase(fetchCoupon.fulfilled, ({ coupon }, { payload }) => {
        coupon.isLoading = false;
        coupon.coupon = [...payload];
      })
      .addCase(fetchCoupon.pending, ({ coupon }) => {
        coupon.isLoading = true;
      })
      .addCase(fetchCoupon.rejected, ({ coupon }, { error }) => {
        coupon.err = error.message;
        coupon.isLoading = false;
      })
      .addCase(addCoupon.fulfilled, ({ coupon }, { payload }) => {
        coupon.isLoading = false;
        coupon.coupon = [payload, ...coupon.coupon];
        toasty("تم اضافة التخفيض", {
          type: "success",
          toastId: "addCoupon",
          autoClose: 5000,
        });
      })
      .addCase(addCoupon.rejected, ({ coupon }, { error }) => {
        coupon.err = error.message;
        coupon.isLoading = false;
      })
      .addCase(removeCoupon.fulfilled, ({ coupon }, { payload }) => {
        coupon.isLoading = false;
        coupon.coupon = [
          ...coupon.coupon.filter((e) => e?._id != payload?._id),
        ];
        toasty("تم حذف التخفيض", {
          type: "success",
          toastId: "addCoupon",
          autoClose: 5000,
        });
      })
      .addCase(removeCoupon.rejected, ({ coupon }, { error }) => {
        coupon.err = error.message;
        coupon.isLoading = false;
      });
  },
});
const { updateStatus } = couponSlice.actions;
export { fetchCoupon, removeCoupon, addCoupon };
export default couponSlice.reducer;
