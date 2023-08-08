// const removeReel = createAsyncThunk(
//   "removeReel",
//   async (data, { fulfillWithValue, rejectWithValue }) => {
//     try {
//       const res = await Axios.delete("/reels", {data});
//       return fulfillWithValue(res.data);
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );