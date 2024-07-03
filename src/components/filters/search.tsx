import { useDispatch } from 'react-redux';
import { FormControl, InputLabel, Input, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { AppDispatch } from '../../store/store';
import { filmsSlice } from '../../store/reducers/films_slice';
import { filtersSlice } from '../../store/reducers/filters_slice';
import { debounce } from '../../utils';

export function Search() {
  const dispatch = useDispatch<AppDispatch>();
  const { setPage, setSort, setSearch } = filmsSlice.actions;
  const { resetFilters } = filtersSlice.actions;

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    if (event.target.value.trim() !== '') {
      dispatch(setSearch(event.target.value));
    }
    if (event.target.value === '') {
      if (dispatch) {
        if (setSort) dispatch(setSort('Popularity'));
        dispatch(setPage(1));
        dispatch(setSearch(''));
        dispatch(resetFilters());
      }
    }
  }

  const debounceHandleChange = debounce(handleChange, 500);

  return (
    <FormControl variant="standard" fullWidth>
      <InputLabel htmlFor="input-with-icon-adornment">Movie title</InputLabel>
      <Input
        id="input-with-icon-adornment"
        endAdornment={
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        }
        onChange={debounceHandleChange}
      />
    </FormControl>
  );
}
