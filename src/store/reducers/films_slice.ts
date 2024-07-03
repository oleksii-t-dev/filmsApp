import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: ICardsState= {
  cards: [],
  favorites: [],
  page: 1,
  sort: 'Popularity',
  totalPages: 10,
  search: '',
  selectedGenres: '',
  rangeYears: [1970, 2024],
  isLoading: false,
  error: '',
};

export const filmsSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {
    setCards(state, action: PayloadAction<ICardsFilmsRTK[]>) {
      state.cards = action.payload
    },
    setFavorites(state, action: PayloadAction<IFavorites[]>) {
      state.favorites = action.payload
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload
    },
    setSort(state, action: PayloadAction<string>) {
      state.sort = action.payload
    },
    setTotalPages(state, action: PayloadAction<number>) {
      state.totalPages = action.payload
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload
    },
    setSelectedGenres(state, action: PayloadAction<string>) {
      state.selectedGenres = action.payload
    },
    setRangeYears(state, action: PayloadAction<number[] | number>) {
      state.rangeYears = action.payload
    },
  }
})

export const filmsReducer = filmsSlice.reducer;

interface ICardsFilmsRTK {
  id: number;
  title: string;
  vote_average: number;
  poster_path: string;
}

export interface ICardsState {
  cards: ICardsFilmsRTK[];
  favorites: IFavorites[];
  page: number;
  sort: string;
  totalPages: number;
  search: string | null;
  selectedGenres: string;
  rangeYears: number[] | number;
  isLoading: boolean;
  error: string;
}

interface IFavorites {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}