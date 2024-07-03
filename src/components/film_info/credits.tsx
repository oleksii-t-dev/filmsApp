import { memo } from 'react';
import { Box, Grid, Typography } from '@mui/material/';
import { IDataCredits } from '../types/film_info_page_types';

interface CreditsProps {
  dataCredits: IDataCredits;
}

export const Credits: React.FC<CreditsProps> = memo(({ ...props }) => {
  const { dataCredits } = props;
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-around"
      alignItems="center">
      <Box>
        <Typography variant="subtitle1" gutterBottom>
          Actors cast:
        </Typography>
        {dataCredits?.cast.slice(0, 5).map((key) => (
          <Typography key={key.name} variant="subtitle2" gutterBottom>
            {key.name + ' - ' + '"' + key.character + '"'}
          </Typography>
        ))}
      </Box>
      <Box>
        <Typography variant="subtitle1" gutterBottom>
          Creators:
        </Typography>
        {dataCredits?.crew.slice(0, 5).map((key) => (
          <Typography key={key.credit_id} variant="subtitle2" gutterBottom>
            {key.job + ' - ' + key.name}
          </Typography>
        ))}
      </Box>
    </Grid>
  );
});
