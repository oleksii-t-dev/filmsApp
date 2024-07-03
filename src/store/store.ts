import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { userReducer } from './reducers/user_slice';
import { filmsReducer } from './reducers/films_slice';
import { filtersReducer } from './reducers/filters_slice';

const rootReducer = combineReducers({
  userReducer,
  filmsReducer,
  filtersReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
