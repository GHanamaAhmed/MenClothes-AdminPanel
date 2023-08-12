import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Axios } from "../../../lib/axios";
const fetchReelsStatistique = createAsyncThunk(
  "fetchReelsStatistique",
  async (empty, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await Axios.get("/reels/statistique");
      return fulfillWithValue(res.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
const fetchReels = createAsyncThunk(
  "fetchReels",
  async ({ min, reverse }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await Axios.get(
        `/reels?min=${min || 0}&max=${min || 0 + 3}&${
          reverse ? `reverse=${reverse}` : ""
        }`
      );
      return fulfillWithValue(res.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
const fetchReelsMore = createAsyncThunk(
  "fetchReelsMore",
  async ({ min, reverse }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await Axios.get(
        `/reels?min=${min || 0}&max=${min || 0 + 3}&${
          reverse ? `reverse=${reverse}` : ""
        }`
      );
      return fulfillWithValue(res.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
const updateReel = createAsyncThunk(
  "updateReel",
  async (data, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await Axios.put("/reels", data);
      return fulfillWithValue(res.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
const removeReel = createAsyncThunk(
  "removeReel",
  async (data, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await Axios.delete("/reels", { data });
      return fulfillWithValue(res.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
const reelsSlice = createSlice({
  name: "reels",
  initialState: {
    reels: {
      isLoading: false,
      err: undefined,
      reels: [],
    },
    statistique: {
      isLoading: false,
      err: undefined,
      reels: 0,
      lastReels: 0,
      views: 0,
      lastViews: 0,
      likes: 0,
      lastLikes: 0,
      comment: 0,
      lastComment: 0,
    },
  },
  reducers: {
    uploadReel: ({ reels }, { payload }) => {
      const reel = {
        ...payload,
        likes: 0,
        isLike: 0,
        comments: 0,
      };
      (reels.isLoading = false), (reels.reels = [...reels.reels, reel]);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchReelsStatistique.fulfilled,
        ({ statistique }, { payload }) => {
          statistique.reels = payload?.reels;
          statistique.lastReels = payload?.lastReels;
          statistique.views = payload?.views;
          statistique.lastViews = payload?.lastViews;
          statistique.likes = payload?.likes;
          statistique.lastLikes = payload?.lastLikes;
          statistique.comment = payload?.comment;
          statistique.lastComment = payload?.lastComment;
          statistique.isLoading = false;
        }
      )
      .addCase(fetchReelsStatistique.pending, ({ statistique }) => {
        statistique.isLoading = true;
      })
      .addCase(fetchReelsStatistique.rejected, ({ statistique }, { error }) => {
        statistique.err = error.message;
        statistique.isLoading = false;
      })
      .addCase(fetchReels.fulfilled, ({ reels }, { payload }) => {
        reels.isLoading = false;
        reels.reels = [...payload];
      })
      .addCase(fetchReels.pending, ({ reels }) => {
        reels.isLoading = true;
      })
      .addCase(fetchReels.rejected, ({ reels }, { error }) => {
        reels.err = error.message;
        reels.isLoading = false;
      })
      .addCase(fetchReelsMore.fulfilled, ({ reels }, { payload }) => {
        reels.isLoading = false;
        reels.reels = [...reels.reels, ...payload];
      })
      .addCase(fetchReelsMore.rejected, ({ reels }, { error }) => {
        reels.err = error.message;
        reels.isLoading = false;
      })
      .addCase(updateReel.fulfilled, ({ reels }, { payload }) => {
        reels.isLoading = false;
        reels.reels = [
          ...reels.reels.map((e) => {
            if (e?._id == payload?._id) {
              e = { ...e, ...payload };
            }
            return e;
          }),
        ];
      })
      .addCase(updateReel.rejected, ({ reels }, { error }) => {
        reels.err = error.message;
        reels.isLoading = false;
      })
      .addCase(removeReel.fulfilled, ({ reels }, { payload }) => {
        reels.isLoading = false;
        reels.reels = [...reels.reels.filter((e) => e?._id != payload?._id)];
      })
      .addCase(removeReel.rejected, ({ reels }, { error }) => {
        reels.err = error.message;
        reels.isLoading = false;
      });
  },
});
const { uploadReel } = reelsSlice.actions;
export {
  fetchReelsStatistique,
  fetchReels,
  updateReel,
  removeReel,
  uploadReel,
  fetchReelsMore
};
export default reelsSlice.reducer;
