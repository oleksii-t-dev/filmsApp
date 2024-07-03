import { RootState } from "./store";

export const selectorResetKey = (state: RootState) => state.filtersReducer.resetKey;

export const selectorSearch = (state: RootState) => state.filmsReducer.search;
export const selectorPage = (state: RootState) => state.filmsReducer.page;
export const selectorSort = (state: RootState) => state.filmsReducer.sort;
export const selectorToken = (state: RootState) => state.userReducer.token;
export const selectorGenres = (state: RootState) => state.filmsReducer.selectedGenres;
export const selectorRangeYears = (state: RootState) => state.filmsReducer.rangeYears;