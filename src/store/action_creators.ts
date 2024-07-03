import axios from 'axios';
import { AppDispatch } from './store';
import { IUserData, userSlice } from './reducers/user_slice';
import { getFavoritesData, getOptions } from '../api/films_api';
import { filmsSlice } from './reducers/films_slice';

export const fetchUser = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(userSlice.actions.userFetching());
    const response = await axios.get<IUserData>(
      'https://api.themoviedb.org/3/account/account_id',
      getOptions(),
    );
    const data = await response.data;
    dispatch(userSlice.actions.userFetchingSuccess(JSON.stringify(data.id)));
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      dispatch(userSlice.actions.userFetchingError(error.message));
    }
  }
};

export const fetchFilms =
  (SELECTED_URL: string, page: number) => async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get(
        SELECTED_URL + `&page=${page}`,
        getOptions(),
      );

      const data = await response.data;

      dispatch(filmsSlice.actions.setTotalPages(data.total_pages));
      dispatch(filmsSlice.actions.setCards(data.results));
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

export const fetchFavorites = () => async (dispatch: AppDispatch) => {
  try {
    const data = await getFavoritesData();
    dispatch(filmsSlice.actions.setFavorites(data.results));
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const showFavorites = () => async (dispatch: AppDispatch) => {
  try {
    const data = await getFavoritesData();
    dispatch(filmsSlice.actions.setFavorites(data.results));
    dispatch(filmsSlice.actions.setTotalPages(data.total_pages));
    dispatch(filmsSlice.actions.setCards(data.results));
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchSearch =
  (SELECTED_URL: string) => async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get(SELECTED_URL, getOptions());
      const data = await response.data;

      dispatch(filmsSlice.actions.setTotalPages(data.total_pages));
      dispatch(filmsSlice.actions.setSort('Search'));
      dispatch(filmsSlice.actions.setCards(data.results));
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

export const fetchByGenres =
  (selectedGenres: string, page: number) => async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc&page=${page}&with_genres=${selectedGenres}`,
        getOptions(),
      );
      const data = await response.data;
      dispatch(filmsSlice.actions.setTotalPages(data.total_pages));
      dispatch(filmsSlice.actions.setCards(data.results));
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

export const fetchByYear =
  (page: number, start: string, end: string) =>
  async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&primary_release_date.gte=${start}&primary_release_date.lte=${end}&sort_by=popularity.desc`,
        getOptions(),
      );
      const data = await response.data;

      dispatch(filmsSlice.actions.setTotalPages(data.total_pages));
      dispatch(filmsSlice.actions.setCards(data.results));
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
