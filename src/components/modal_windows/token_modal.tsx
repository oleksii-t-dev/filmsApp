import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from '@mui/material/';
import { AppDispatch } from '../../store/store';
import { userSlice } from '../../store/reducers/user_slice';

interface ITokenModal {
  openLogin: boolean;
  handleCloseLogin: () => void;
}

export function TokenModal({ openLogin, handleCloseLogin }: ITokenModal) {
  const dispatch = useDispatch<AppDispatch>();
  const { userToken, userId } = userSlice.actions;
  const [value, setValue] = useState<string>('');
  const [errorInput, setErrorInput] = useState<boolean>(false);

  async function checkToken(value: string) {
    try {
      const response = await fetch(
        'https://api.themoviedb.org/3/account/account_id',
        {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${value}`,
          },
        },
      );
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('account_id', JSON.stringify(data.id));
        localStorage.setItem('TOKEN', value);

        dispatch(userToken(value));
        dispatch(userId(JSON.stringify(data.id)));

        setValue('');
        handleCloseLogin();
      } else {
        setValue('ENTER VALID TOKEN !!!');
        setErrorInput(true);

        dispatch(userToken(''));
        dispatch(userId(''));

        localStorage.setItem('account_id', JSON.stringify(''));
        localStorage.setItem('TOKEN', '');
        localStorage.clear();
      }
    } catch (err) {
      if (err instanceof Error) console.error(err);
    }
  }

  return (
    <>
      <Dialog fullWidth open={openLogin} onClose={handleCloseLogin}>
        <DialogTitle>Enter token</DialogTitle>
        <DialogContent>
          <TextField
            error={errorInput}
            autoFocus
            margin="dense"
            id="name"
            label="Token:"
            value={value}
            type="email"
            fullWidth
            variant="standard"
            required
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseLogin}>Cancel</Button>
          <Button onClick={() => checkToken(value)}>OK</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
