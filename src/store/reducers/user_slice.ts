import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IUserState {
  token: string;
  account_id: string;
  isLoading: boolean;
  errorUser: string | null;
}

const initialState: IUserState = {
  token: localStorage.getItem('TOKEN') || '',
  account_id: localStorage.getItem('account_id') || '',
  isLoading: false,
  errorUser: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userToken(state, action: PayloadAction<string>){
      state.token = action.payload;
    },
    userId(state, action: PayloadAction<string>){
      state.account_id = action.payload;
    },
    userFetching(state){
      state.isLoading = true;
    },
    userFetchingSuccess(state, action: PayloadAction<string>){
      state.isLoading = false;
      state.errorUser = null;
      state. account_id = action.payload;
    },
    userFetchingError(state, action: PayloadAction<string>){
      state.isLoading = false;
      state.errorUser = action.payload;
    },
    userFetchingResetError(state){ 
      state.errorUser = null;
    },

  } 
})

export const userReducer = userSlice.reducer;

export interface IUserData {
  avatar: Avatar
  id: number
  iso_639_1: string
  iso_3166_1: string
  name: string
  include_adult: boolean
  username: string
}

export interface Avatar {
  gravatar: Gravatar
  tmdb: Tmdb
}

export interface Gravatar {
  hash: string
}

export interface Tmdb {
  avatar_path: string
}


