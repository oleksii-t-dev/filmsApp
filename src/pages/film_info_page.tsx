import { useState, useEffect, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../api/films_api';
import {
  Container,
  Grid,
  IconButton,
  Typography,
  CardActions,
  CssBaseline,
  CircularProgress,
  Alert,
} from '@mui/material/';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { Header } from '../components/header';
import {
  IDataCredits,
  IDataDetails,
} from '../components/types/film_info_page_types';
import { updateFavorites, getFavoritesData } from '../api/films_api';
import { Credits } from '../components/film_info/credits';
import { Description } from '../components/film_info/description';
import { Details } from '../components/film_info/details';
import { AppDispatch, RootState } from '../store/store';
import { filmsSlice } from '../store/reducers/films_slice';

export const FilmInfo = memo(function FilmInfo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dataDetails, setDataDetails] = useState<IDataDetails | null>(null);
  const [dataCredits, setDataCredits] = useState<IDataCredits | null>(null);
  const [selected, setSelected] = useState(false);
  const [alert, setAlert] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const { setFavorites } = filmsSlice.actions;
  const favorites = useSelector(
    (state: RootState) => state.filmsReducer.favorites,
  );

  useEffect(() => {
    try {
      axios
        .get(BASE_URL + `${id}` + '?language=en-US', {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('TOKEN') || '',
          },
        })
        .then(({ data }) => {
          setDataDetails(data);
        });
      axios
        .get(BASE_URL + `${id}` + '/credits?language=en-US', {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('TOKEN') || '',
          },
        })
        .then(({ data }) => {
          setDataCredits(data);
        });
      getFavoritesData().then((data) => {
        dispatch(setFavorites(data.results || []));
      });
    } catch (error) {
      console.error(error);
    }
  }, [id]);

  const handleGoBack = () => {
    navigate('/');
  };

  const checkId = (id: number) =>
    favorites.some((item: { id: number }) => item.id === id);

  useEffect(() => {
    if (dataDetails && dataDetails.id) {
      setSelected(checkId(dataDetails.id));
    }
  }, [favorites, id]);

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setSelected(!selected);
    setAlert(false);
    try {
      if (dataDetails && dataDetails.id) {
        await updateFavorites(dataDetails.id, selected);
      }
      getFavoritesData().then((data) => {
        dispatch(setFavorites(data.results || []));
      });
    } catch (error) {
      setSelected(selected);
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 1500);
    }
  };

  return (
    <>
      <CssBaseline />
      <Header
        text={(dataDetails && 'Film - ' + dataDetails.title) || 'Films'}
      />
      {dataDetails && dataCredits?.cast && dataCredits?.crew ? (
        <Container sx={{ marginTop: '25px', position: 'relative' }}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12} md={6} sx={{}}>
              <img
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  objectPosition: 'top',
                }}
                src={
                  'https://image.tmdb.org/t/p/original/' +
                  dataDetails.poster_path
                }
                alt={'Poster: ' + dataDetails.title}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                sx={{ flexWrap: 'nowrap' }}>
                <Typography variant="h4">{dataDetails.title}</Typography>
                <CardActions>
                  <IconButton
                    onClick={handleClick}
                    color={selected ? 'primary' : 'default'}>
                    {selected ? <StarIcon /> : <StarBorderIcon />}
                  </IconButton>
                </CardActions>
              </Grid>
              <IconButton
                sx={{}}
                size="large"
                aria-label=""
                onClick={handleGoBack}>
                <ArrowBackIcon sx={{}} fontSize="inherit" />
              </IconButton>

              <Credits dataCredits={dataCredits} />
              <Description dataDetails={dataDetails} />
              <Details dataDetails={dataDetails} />
            </Grid>
          </Grid>
          {alert && (
            <Alert
              sx={{
                position: 'absolute',
                top: 0,
                right: 0,
              }}
              severity="error">
              Error!!! Is there something wrong!
            </Alert>
          )}
        </Container>
      ) : (
        <Container sx={{ marginTop: '25px' }}>
          Loading... <CircularProgress color="info" />
        </Container>
      )}
    </>
  );
});
