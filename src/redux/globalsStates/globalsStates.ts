import { createSlice } from '@reduxjs/toolkit';

type InitialState = { editId: string };

const initialState: InitialState = {
  editId: '',
};

export const globalsStatesSlice = createSlice({
  name: 'globals',
  initialState,
  reducers: {
    setScheduleId: (state, action) => {
      state.editId = action.payload;
    },
  },
});

export const userActions = globalsStatesSlice.actions;
export const { setScheduleId } = globalsStatesSlice.actions;
export const globalsStatesReducer = globalsStatesSlice.reducer;
