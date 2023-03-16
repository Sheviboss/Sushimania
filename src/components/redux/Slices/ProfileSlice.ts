import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface ProfileState {
  category: number;
}
const initialState: ProfileState = {
  category: -1,
};

export const ProfileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<number>) => {
      state.category = action.payload;
    },
  },
});

export const { setCategory } = ProfileSlice.actions;

export default ProfileSlice.reducer;
