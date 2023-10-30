const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const { Axios } = require("../../../lib/axios");
const { formatDate } = require("../../../lib/date");
const fetchUsers = createAsyncThunk(
  "users/fetch",
  async (
    { min, tab, input, reverse },
    { fulfillWithValue, rejectWithValue }
  ) => {
    try {
      const data = await Axios.get(
        `/users?min=${min}&max=${min + 6}&${
          tab != "all" && tab ? `type=${tab}` : ""
        }&${input ? `name=${input}` : ""}&${
          reverse ? `reverse=${reverse}` : ""
        }`
      );
      return fulfillWithValue(data.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
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
const controlPanelSlice = createSlice({
  name: "controlPanel",
  initialState: {
    users: {
      users: [],
      count: 0,
      isLoading: false,
      err: undefined,
    },
    statistique: {
      nUsers: 0,
      lastUsers: 0,
      views: 0,
      profits: 0,
      lastProfits: 0,
      sales: 0,
      lastSales: 0,
      isLoading: false,
      err: undefined,
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, ({ users }, { payload }) => {
        users.isLoading = false;
        users.count = payload?.count || 0;
        users.users = payload?.users?.map((e) => {
          return {
            img: e?.Photo,
            name: e?.firstName + "-" + e?.lastName,
            email: e?.email,
            provider: e?.provider,
            items: e?.products,
            paid: e?.price,
            subsicribed: false,
            date: formatDate(e?.createAt),
          };
        });
      })
      .addCase(fetchUsers.pending, ({ users }) => {
        users.isLoading = true;
      })
      .addCase(fetchUsers.rejected, ({ users }, { error }) => {
        users.isLoading = false;
        users.err = error;
      })
      .addCase(fetchStatistique.fulfilled, ({ statistique }, { payload }) => {
        statistique.isLoading = false;
        statistique.nUsers = payload?.users;
        statistique.views = payload?.views;
        statistique.sales = payload?.sales;
        statistique.profits = payload?.profits;
        statistique.lastUsers = payload?.lastUsers;
        statistique.lastSales = payload?.lastSales;
        statistique.lastProfits = payload?.lastProfits;
      })
      .addCase(fetchStatistique.pending, ({ statistique: { isLoading } }) => {
        isLoading = true;
      })
      .addCase(
        fetchStatistique.rejected,
        ({ statistique: { isLoading, err } }, { error }) => {
          isLoading = false;
          err = error;
        }
      );
  },
});
export { fetchStatistique, fetchUsers };
export default controlPanelSlice.reducer;
