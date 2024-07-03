import { memo } from 'react';
import { Box, Grid } from '@mui/material/';
import { IDataDetails } from '../types/film_info_page_types';

interface DescriptionProps {
  dataDetails: IDataDetails;
}

export const Details: React.FC<DescriptionProps> = memo(({ dataDetails }) => {
  return (
    <Box>
      <Box>Details: </Box>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center">
        <Box sx={{ marginLeft: '25px' }}>Countrie: </Box>
        <Box>
          {dataDetails.production_countries
            .map((key) => key.name)
            .slice(0, 2)
            .join(', ')}
        </Box>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center">
        <Box sx={{ marginLeft: '25px' }}>Release date: </Box>
        <Box>{dataDetails.release_date}</Box>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center">
        <Box sx={{ marginLeft: '25px' }}>Genres: </Box>
        <Box>{dataDetails.genres.map((key) => key.name).join(', ')}</Box>
      </Grid>

      {(dataDetails.budget !== 0 || undefined) && (
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center">
          <Box sx={{ marginLeft: '25px' }}>Budget: </Box>
          <Box>{new Intl.NumberFormat().format(dataDetails.budget)} $</Box>
        </Grid>
      )}
      {(dataDetails.revenue !== 0 || undefined) && (
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center">
          <Box sx={{ marginLeft: '25px' }}>Revenue: </Box>
          <Box>{new Intl.NumberFormat().format(dataDetails.revenue)} $</Box>
        </Grid>
      )}
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center">
        <Box sx={{ marginLeft: '25px' }}>Film duration:</Box>
        <Box>
          {dataDetails.runtime} min / {(dataDetails.runtime / 60).toFixed(2)}{' '}
          hour(s)
        </Box>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center">
        <Box sx={{ marginLeft: '25px' }}>Rating:</Box>
        <Box>{dataDetails.vote_average.toFixed(1)}</Box>
      </Grid>
    </Box>
  );
});
