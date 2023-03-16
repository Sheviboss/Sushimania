import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface FilterState {
  minPrice: number;
  maxPrice: number;
  minWeight: number;
  maxWeight: number;
  setSearch: boolean;
  cheeze: boolean;
  nocheeze: boolean;
  rolls: [] | any;
  rollsComposition: [] | any;
  pizzaPortions: [] | any;
  pizzaDoavki: [] | any;
}

const initialState: FilterState = {
  minPrice: 0,
  maxPrice: 5000,
  minWeight: 0,
  maxWeight: 5000,
  setSearch: false,
  cheeze: false,
  nocheeze: false,
  rolls: [],
  rollsComposition: [],
  pizzaPortions: 0,
  pizzaDoavki: [],
};
export const FilterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilterMinPriceValue: (state, action: PayloadAction<number>) => {
      state.minPrice = action.payload;
    },
    setFilterMaxPriceValue: (state, action: PayloadAction<number>) => {
      state.maxPrice = action.payload;
    },
    setFilterMinWeight: (state, action: PayloadAction<number>) => {
      state.minWeight = action.payload;
    },
    setFilterMaxWeight: (state, action: PayloadAction<number>) => {
      state.maxWeight = action.payload;
    },
    setFilterCheeze: (state, action: PayloadAction<boolean>) => {
      state.cheeze = action.payload;
    },
    setFilterNoCheeze: (state, action: PayloadAction<boolean>) => {
      state.nocheeze = action.payload;
    },
    setFilterRolls: (state, action: PayloadAction<string[]>) => {
      state.rolls = action.payload;
    },
    setFilterRollsComposition: (state, action: PayloadAction<string[]>) => {
      state.rollsComposition = action.payload;
    },
    setFilterPizzaPortions: (state, action: PayloadAction<string[]>) => {
      state.pizzaPortions = action.payload;
    },
    setFilterPizzaDobavki: (state, action: PayloadAction<string[]>) => {
      state.pizzaDoavki = action.payload;
    },
  },
});

export const {
  setFilterMinPriceValue,
  setFilterMaxPriceValue,
  setFilterMinWeight,
  setFilterMaxWeight,
  setFilterCheeze,
  setFilterNoCheeze,
  setFilterRolls,
  setFilterRollsComposition,
  setFilterPizzaPortions,
  setFilterPizzaDobavki,
} = FilterSlice.actions;

export default FilterSlice.reducer;
