import { Box, Slider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { filmsSlice } from '../../store/reducers/films_slice';

export function YearRangeSlider() {
  const dispatch = useDispatch<AppDispatch>();
  const { setRangeYears, setSort, setSearch } = filmsSlice.actions;
  const rangeYears = useSelector((state: RootState) => state.filmsReducer.rangeYears);

  const handleChange = (event: Event, newValue: number[] | number ) => {  
    dispatch(setRangeYears(newValue));
    dispatch(setSort('Year'));
    dispatch(setSearch(''));
    return event;
  };

  return (
    <Box sx={{ marginTop: '25px', marginBottom: '25px' }}>
      <Box sx={{ marginBottom: '35px' }}>Release year:</Box>
      <Slider
        max={2024}
        min={1970}
        marks={marks}
        getAriaLabel={() => 'Year range'}
        value={rangeYears}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
      />
    </Box>
  );
}

function valuetext(value: number) {
  return `${value}`;
}
const marks = [
  {
    value: 1970,
  },
  {
    value: 1980,
  },
  {
    value: 1990,
  },
  {
    value: 2000,
  },
  {
    value: 2010,
  },
  {
    value: 2024,
  },
];
