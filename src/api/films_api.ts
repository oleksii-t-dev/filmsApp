import { useEffect, useState } from 'react';
import { IGenres } from '../components/types/filters_types';

export const BASE_URL = 'https://api.themoviedb.org/3/movie/';
export const POPULAR_URL = BASE_URL + 'popular?language=en-US/';
export const RATED_URL = BASE_URL + 'top_rated?language=en-US';
const GENRES_URL = 'https://api.themoviedb.org/3/genre/movie/list?language=en';

export function getOptions() {
  const TOKEN = localStorage.getItem('TOKEN') || '';
  return {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    },
  };
}

export function useGenresData() {
  const [genresData, setGenresData] = useState<IGenres[]>([]);
  const options = getOptions();
  useEffect(() => {
    fetch(GENRES_URL, options)
      .then((response) => response.json())
      .then((data) => setGenresData(data.genres))
      .catch((error) => console.error('Error: ', error));
  }, []);
  return genresData;
}

export async function getFavoritesData() {
  try {
    const account_id = JSON.parse(localStorage.getItem('account_id') || '');
    const options = getOptions();
    const response = await fetch(
      `https://api.themoviedb.org/3/account/${account_id}/favorite/movies`,
      options,
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    if (error instanceof Error) console.error(error);
    throw error;
  }
}

export async function updateFavorites(movie_id: number, update: boolean) {
  const token = localStorage.getItem('TOKEN') || '';
  const account_id = JSON.parse(localStorage.getItem('account_id') || '');
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      media_type: 'movie',
      media_id: movie_id,
      favorite: !update,
    }),
  };
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/account/${account_id}/favorite`,
      options,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) console.error(error);
    throw error;
  }
}
