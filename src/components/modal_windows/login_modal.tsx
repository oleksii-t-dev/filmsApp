import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from '@mui/material/';

interface ILoginModal {
  openLogin: boolean;
  handleCloseLogin: () => void;
  handleClickOpenTokenModal: () => void;
}

export function LoginModal({
  openLogin,
  handleCloseLogin,
  handleClickOpenTokenModal,
}: ILoginModal) {
  const [value, setValue] = useState('');

  

  return (
    <>
      <Dialog fullWidth open={openLogin} onClose={handleCloseLogin}>
        <DialogTitle>Request a token</DialogTitle>
        <DialogContent>
          <TextField
            error={!value.includes('@')}
            autoFocus
            margin="dense"
            id="name"
            label="Email Address:"
            type="email"
            fullWidth
            variant="standard"
            required
            onChange={(e) => setValue(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseLogin}>Cancel</Button>
          <Button
            onClick={() => {
              if (value.includes('@')) {
                handleCloseLogin();
                handleClickOpenTokenModal();
              }
            }}>
            Request
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
