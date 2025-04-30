// reviewSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ReviewState {
  reviews: { [id: string]: { reply: string } };
}

const initialState: ReviewState = {
  reviews: {},
};

const reviewSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    setReviewReply(
      state,
      action: PayloadAction<{ reviewId: string; reply: string }>,
    ) {
      const { reviewId, reply } = action.payload;
      if (state.reviews[reviewId]) {
        state.reviews[reviewId].reply = reply;
      } else {
        state.reviews[reviewId] = { reply };
      }
    },
  },
});

export const { setReviewReply } = reviewSlice.actions;
export default reviewSlice.reducer;
