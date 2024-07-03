import { memo } from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';
import { SelectComponent } from './select';
import { YearRangeSlider } from './range_slider';
import { Genres } from './genres';
import { useGenresData } from '../../api/films_api';
import { Search } from './search';
import { selectorResetKey } from '../../store/selectors';

const sortBy = ['Popularity', 'Rating', 'My Favorites'];

export const Filters = memo(function Filters() {
  const reset = useSelector(selectorResetKey);
  const genresData = useGenresData();

  return (
    <Box key={reset} sx={{ flexGrow: 1 }}>
      <Search />
      <SelectComponent title="Sort by:" data={sortBy} />
      <YearRangeSlider />
      <Genres data={genresData} />
    </Box>
  );
});
