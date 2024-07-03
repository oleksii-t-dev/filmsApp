import { useState, memo } from 'react';
import { useSelector } from 'react-redux';
import { Box, Grid, IconButton, Paper } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import logo from '../assets/film-camera.svg';
import { LoginModal } from './modal_windows/login_modal';
import { TokenModal } from './modal_windows/token_modal';
import { RootState } from '../store/store';

export const Header = memo(function Header({ text }: { text: string }) {
  const TOKEN = useSelector((state: RootState) => state.userReducer.token);

  const [openLogin, setOpenLogin] = useState<boolean>(false);
  const [openTokenModal, setOpenTokenModal] = useState<boolean>(false);

  const handleClickOpenLogin: () => void = () => {
    if (TOKEN === '') return setOpenLogin(true);
    handleClickOpenTokenModal();
  };
  const handleClickOpenTokenModal: () => void = () => {
    setOpenTokenModal(true);
  };

  const handleCloseLogin: () => void = () => {
    setOpenLogin(false);
  };

  const handleCloseTokenModal: () => void = () => {
    setOpenTokenModal(false);
  };

  return (
    <Box
      component="header"
      sx={{
        '& > :not(style)': {
          width: '100%',
          height: '100%',
          padding: '16px 25px',
          backgroundColor: '#2196F3',
        },
      }}>
      <Paper elevation={6} square={true}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center">
          <Box
            sx={{
              color: '#fff',
              fontFamily: 'Roboto Mono, monospace',
              fontSize: '20px',
            }}>
            {text}
          </Box>
          {text === 'Films' && (
            <Box>
              <img
                src={logo}
                alt="logo"
                style={{ width: '40px', height: '40px', fill: '#fff' }}
              />
            </Box>
          )}

          <IconButton
            sx={{}}
            size="large"
            aria-label=""
            onClick={handleClickOpenTokenModal}>
            <AccountCircleIcon sx={{ fill: '#fff' }} fontSize="inherit" />
          </IconButton>
        </Grid>
      </Paper>
      <LoginModal
        openLogin={openLogin}
        handleCloseLogin={handleCloseLogin}
        handleClickOpenTokenModal={handleClickOpenTokenModal}
      />
      <TokenModal
        openLogin={openTokenModal}
        handleCloseLogin={handleCloseTokenModal}
      />
    </Box>
  );
});
