import { useDispatch } from 'react-redux';
import { Box, Grid, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { filmsSlice } from '../../store/reducers/films_slice';
import { AppDispatch } from '../../store/store';
import { filtersSlice } from '../../store/reducers/filters_slice';

export function FiltersHeader() {
  const dispatch = useDispatch<AppDispatch>();
  const { setPage, setSort, setSearch, setRangeYears, setSelectedGenres } = filmsSlice.actions;
  const { resetFilters } = filtersSlice.actions;
  
  function resetAllFilters() {
    if (dispatch) {
      if (setSort) dispatch(setSort('Popularity'));
      dispatch(setPage(1));
      dispatch(setSearch(''));
      dispatch(resetFilters());
      dispatch(setRangeYears([1970, 2023]));
      dispatch(setSelectedGenres(''));    
    }
  }

  return (
    <Grid
      sx={{ flexGrow: 0 }}
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center">
      <Box>Filters</Box>
      <IconButton
        sx={{}}
        size="large"
        aria-label=""
        onClick={resetAllFilters}>
        <CloseIcon sx={{}} fontSize="inherit" />
      </IconButton>
    </Grid>
  );
}
