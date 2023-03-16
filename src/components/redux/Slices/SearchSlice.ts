import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface SearchState {
  search: string;
  setSearch: boolean;
}
const initialState: SearchState = {
  search: '',
  setSearch: false,
};

export const SearchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setSearch: (state, action: PayloadAction<boolean>) => {
      state.setSearch = action.payload;
    },
  },
});

export const { setSearchValue, setSearch } = SearchSlice.actions;

export default SearchSlice.reducer;
