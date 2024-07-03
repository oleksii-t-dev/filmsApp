import { memo } from 'react';
import { Box } from '@mui/material/';
import { IDataDetails } from '../types/film_info_page_types';

interface DescriptionProps {
  dataDetails: IDataDetails;
}

export const Description: React.FC<DescriptionProps> = memo(
  ({ dataDetails }) => {
    return (
      <Box sx={{ marginBottom: '25px' }}>
        <Box>Description: </Box>
        <Box component="p" sx={{ marginLeft: '25px' }}>
          {dataDetails.overview}
        </Box>
      </Box>
    );
  },
);
