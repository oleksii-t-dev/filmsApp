import { IGenres } from '../types/filters_types';
import { Autocomplete, Checkbox, TextField } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { filmsSlice } from '../../store/reducers/films_slice';
import { AppDispatch } from '../../store/store';
import { useDispatch } from 'react-redux';
import { ChangeEvent } from 'react';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export function Genres({ data }: { data: IGenres[] }) {
  const dispatch = useDispatch<AppDispatch>();
  const { setSelectedGenres } = filmsSlice.actions;

  interface Genre {
    id: number;
    name: string;
  }

  const handleChange = (event: ChangeEvent<{}>, value: Genre[]) => {
    const selectedIds = value.map((option: Genre) => option.id);
    dispatch(setSelectedGenres(selectedIds.join()));
    return event;
  };

  return (
    <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={data}
      disableCloseOnSelect
      getOptionLabel={(option) => option.name}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.name}
        </li>
      )}
      style={{}}
      renderInput={(params) => (
        <TextField {...params} label="Genres" variant="standard" sx={{}} />
      )}
      onChange={handleChange}
    />
  );
}
