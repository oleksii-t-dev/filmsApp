import { CssBaseline, Box, Container, Typography } from '@mui/material/';
import { Header } from '../components/header';
import { FiltersAside } from '../components/filters/filters_aside';
import { Cards } from '../components/cards/cards';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { POPULAR_URL, RATED_URL } from '../api/films_api';
import { AppDispatch } from '../store/store';
import {
  fetchByGenres,
  fetchByYear,
  fetchFavorites,
  fetchFilms,
  fetchSearch,
  showFavorites,
} from '../store/action_creators';
import {
  selectorGenres,
  selectorPage,
  selectorRangeYears,
  selectorSearch,
  selectorSort,
  selectorToken,
} from '../store/selectors';

export function HomePage() {
  const dispatch = useDispatch<AppDispatch>();
  const search = useSelector(selectorSearch);
  const page = useSelector(selectorPage);
  const sort = useSelector(selectorSort);
  const TOKEN = useSelector(selectorToken);
  const selectedGenres = useSelector(selectorGenres);
  const rangeYears = useSelector(selectorRangeYears);

  let SELECTED_URL: string;
  switch (sort) {
    case 'Popularity': {
      SELECTED_URL = POPULAR_URL;
      break;
    }
    case 'Rating': {
      SELECTED_URL = RATED_URL;
      break;
    }
    case 'Search': {
      SELECTED_URL = `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=${page}`;
      break;
    }
    default: {
      break;
    }
  }
  let start: string = '';
  let end: string = '';
  if (Array.isArray(rangeYears)) {
    start = rangeYears[0].toString() + '-01-01';
    end = rangeYears[1].toString() + '-12-31';
  }

  useEffect(() => {
    try {
      if (
        (sort === 'Popularity' && selectedGenres === '') ||
        (sort === 'Rating' && selectedGenres === '')
      ) {
        dispatch(fetchFilms(SELECTED_URL, page));
        if (!!TOKEN) {
          dispatch(fetchFavorites());
        }
      }
      if (search !== '' && search !== null) {
        dispatch(fetchSearch(SELECTED_URL));
      }
      if (sort === 'My Favorites') {
        dispatch(showFavorites());
      }
      if (selectedGenres !== '') {
        dispatch(fetchByGenres(selectedGenres, page));
      }
      if (sort === 'Year') {
        dispatch(fetchByYear(page, start, end));
      }
    } catch (error) {
      console.error(error);
    }
  }, [TOKEN, sort, page, search, selectedGenres, rangeYears]);

  

  return (
    <>
      <CssBaseline />

      <Header text={'Films'} />

      {TOKEN || '' ? (
        <Box
          component="main"
          sx={{
            padding: '25px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            margin: '0 auto',
            justifyContent: 'center',
          }}>
          <FiltersAside />
          <Cards />
        </Box>
      ) : (
        <Container>
          <Typography variant="h2">enter token</Typography>
        </Container>
      )}
    </>
  );
}
