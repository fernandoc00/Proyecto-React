import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

function WishInput({ onNewWish }) {
  function SearchButton() {
    return (
      <Button
        variant="contained"
        endIcon={<SendIcon />}
        onClick={() => {
          if (document.getElementById('name').value.length > 0) {
            onNewWish({ id: uuidv4(), text: document.getElementById('name').value, done: false });
            document.getElementById('name').value = '';
          }
        }}
      />
    );
  }

  return (
    <fieldset>
      <legend>New Wish</legend>
      <TextField
        id="name"
        className="form-control"
        label="New Wish"
        variant="standard"
        type="text"
        placeholder="Introduce your new wish"
        InputProps={{ endAdornment: <SearchButton /> }}
        onChange={() => {
          console.log(document.getElementById('name').value);
        }}
        onKeyUp={(event) => {
          if (event.key === 'Enter' && document.getElementById('name').value.length > 0) {
            onNewWish({ id: uuidv4(), text: document.getElementById('name').value, done: false });
            document.getElementById('name').value = '';
          }
        }}
      />

    </fieldset>

  );
}

WishInput.propTypes = {
  onNewWish: PropTypes.func,
};

WishInput.defaultProps = {
  onNewWish: () => {},
};

export default WishInput;
