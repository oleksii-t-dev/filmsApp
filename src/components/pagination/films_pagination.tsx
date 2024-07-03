import { useDispatch, useSelector } from 'react-redux';
import { Pagination, Container } from '@mui/material/';
import { AppDispatch, RootState } from '../../store/store';
import { filmsSlice } from '../../store/reducers/films_slice';

export function FilmsPagination() {
  const dispatch = useDispatch<AppDispatch>();
  const { setPage } = filmsSlice.actions;
  const page = useSelector((state: RootState) => state.filmsReducer.page);
  const totalPages = useSelector(
    (state: RootState) => state.filmsReducer.totalPages,
  );

  return (
    <Container>
      <Pagination
        count={totalPages}
        page={page}
        color="primary"
        onChange={(_, num) => dispatch(setPage(num))}
        size="small"
        siblingCount={1}
        sx={{}}
        boundaryCount={0}
      />
    </Container>
  );
}
