import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Grid,
  IconButton,
  Alert,
} from '@mui/material/';
import { updateFavorites, getFavoritesData } from '../../api/films_api';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { AppDispatch, RootState } from '../../store/store';
import { filmsSlice } from '../../store/reducers/films_slice';

export interface ICardsFilms {
  id: number;
  title: string;
  vote_average: number;
  poster_path: string;
  handleClickCardFilm: (id: number) => void;
}

export const FilmCard = ({
  id,
  title,
  vote_average,
  poster_path,
  handleClickCardFilm,
}: ICardsFilms) => {
  const dispatch = useDispatch<AppDispatch>();
  const favorites = useSelector(
    (state: RootState) => state.filmsReducer.favorites,
  );
  const { setFavorites } = filmsSlice.actions;

  const [selected, setSelected] = useState(false);
  const [alert, setAlert] = useState(false);

  const checkId = (id: number) =>
    favorites.some((item: { id: number }) => item.id === id);

  useEffect(() => {
    setSelected(checkId(id));
  }, [favorites, id]);

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setSelected(!selected);
    setAlert(false);
    try {
      await updateFavorites(id, selected);
      getFavoritesData().then((data) => {
        dispatch(setFavorites(data.results || []));
      });
    } catch (error) {
      setSelected(selected);
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 3000);
    }
  };

  return (
    <Card
      id={`${id}`}
      sx={{
        width: '290px',
        fontFamily: 'Roboto Mono, monospace',
        position: 'relative',
      }}
      onClick={() => handleClickCardFilm(id)}>
      <CardMedia
        component="img"
        alt={'Poster: ' + title}
        height="240"
        image={'https://image.tmdb.org/t/p/original/' + poster_path}
      />
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ flexWrap: 'nowrap' }}>
        <CardContent
          sx={{
            pr: 0,
            height: '120px',

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{
              fontFamily: 'Roboto Mono, monospace',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2,
              lineHeight: '110%',
              overflow: 'hidden',
            }}>
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontFamily: 'Roboto Mono, monospace' }}>
            Rating {vote_average.toFixed(1)}
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton
            onClick={handleClick}
            color={selected ? 'primary' : 'default'}>
            {selected ? <StarIcon /> : <StarBorderIcon />}
          </IconButton>
        </CardActions>
      </Grid>
      {alert && (
        <Alert
          sx={{
            position: 'absolute',
            top: 0,
          }}
          severity="error">
          Error!!! Is there something wrong!
        </Alert>
      )}
    </Card>
  );
};
