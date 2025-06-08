import { createSlice } from '@reduxjs/toolkit';

type InitialState = { editId: string; editServiceId: string };

const initialState: InitialState = {
  editId: '',
  editServiceId: '',
};

export const globalsStatesSlice = createSlice({
  name: 'globals',
  initialState,
  reducers: {
    setScheduleId: (state, action) => {
      state.editId = action.payload;
    },
    setServiceId: (state, action) => {
      state.editServiceId = action.payload;
    },
  },
});

export const userActions = globalsStatesSlice.actions;
export const { setScheduleId, setServiceId } = globalsStatesSlice.actions;
export const globalsStatesReducer = globalsStatesSlice.reducer;
