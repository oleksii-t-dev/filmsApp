import { createSlice } from "@reduxjs/toolkit";

interface IFiltersState  {
  resetKey: number;
}

const initialState: IFiltersState = {
  resetKey: 1,
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    resetFilters(state) {
      state.resetKey += 1
    }
  }
})

export const filtersReducer = filtersSlice.reducer;