import { useDispatch } from 'react-redux';
import { Box, FormControl, InputLabel, NativeSelect } from '@mui/material';
import { ISortBy } from '../types/filters_types';
import { AppDispatch } from '../../store/store';
import { filmsSlice } from '../../store/reducers/films_slice';

export function SelectComponent({ title, data }: ISortBy) {
  const dispatch = useDispatch<AppDispatch>();
  const { setPage, setSort, setSearch } = filmsSlice.actions;

  const list = data.map((key: string | number, i: number) => (
    <option key={i} value={key}>
      {key}
    </option>
  ));

  return (
    <Box sx={{ marginTop: '25px' }}>
      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          {title}
        </InputLabel>
        <NativeSelect
          inputProps={{
            name: `${title}`,
            id: 'uncontrolled-native',
          }}
          onChange={(event) => {
            if (setPage) dispatch(setPage(1));
            if (setSort) dispatch(setSort(event.target.value));
            if (setSearch) dispatch(setSearch(''));
          }}>
          {list}
        </NativeSelect>
      </FormControl>
    </Box>
  );
}
