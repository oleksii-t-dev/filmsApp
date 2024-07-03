import { Box } from '@mui/material';
import { Filters } from './filters';
import { FiltersHeader } from './filters_header';
import { FilmsPagination } from '../pagination/films_pagination';

export interface IPage {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export function FiltersAside() {
  return (
    <Box
      component="aside"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '300px',
        height: 'calc(100vh - 136px)',
        padding: '15px',
        borderRadius: '4px',
        background: '#FFF',
        boxShadow:
          '0px 2px 1px -1px rgba(0, 0, 0, 0.20), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)',
      }}>
      <FiltersHeader />
      <Filters />
      <FilmsPagination />
    </Box>
  );
}
