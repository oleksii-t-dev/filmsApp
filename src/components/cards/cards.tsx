import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material/';
import { FilmCard } from './card';
import { RootState } from '../../store/store';

export function Cards() {
  const cards = useSelector((state: RootState) => state.filmsReducer.cards);
  const sort = useSelector((state: RootState) => state.filmsReducer.sort);
  const navigate = useNavigate();

  function handleClickCardFilm(id: number) {
    navigate(`film/${id}`);
  }

  return (
    <>
      <Box
        component="section"
        sx={{
          display: 'flex',
          flexShrink: 1,
          gap: '20px',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
          flex: 1,
          justifyContent: 'center',
        }}>
        {cards.length !== 0 ? (
          cards.map((card) => (
            <FilmCard
              key={card.id}
              id={card.id}
              title={card.title}
              vote_average={card.vote_average}
              poster_path={card.poster_path}
              handleClickCardFilm={handleClickCardFilm}
            />
          ))
        ) : sort === 'Search' || sort === 'My Favorites' ? (
          'Not found'
        ) : (
          <CircularProgress color="info" />
        )}
      </Box>
    </>
  );
}
