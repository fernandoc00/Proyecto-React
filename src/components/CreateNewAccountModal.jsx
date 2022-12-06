import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';
import PropTypes from 'prop-types';

/** This is a description of the CreateNewAccountModal . */
/**
 *
 *  @fileoverview CreateNewAccountModal.jsx, botones para crear un nuevo deseo

 *

 * @version  2.2

 *

 * @author                 Fernando Caravaca <info@fernandocaravaca.com>

 * @copyright           fernandocaravaca.com

 *

 * @description

 * En este componente encontramos el botón que permite al usuario crear e introducir nuevos deseos.

 * Botones para crear un nuevo deseo
 * @returns HTML with Buttons
 */

/**

 * Función principal que mostrará el botón para crear un deseo

 *

 * @return  {html}

 */
function CreateNewAccountModal({
  open, columns, onClose, onSubmit,
}) {
  /**
 * setValues
 * @constant setValues
 * @type {function}
 * @default useState
 * @return acc
 */
  const [values, setValues] = useState(() => columns.reduce((acc, column) => {
    acc[column.accessorKey ?? ''] = '';
    return acc;
  }, {}));
  /**
 * handleSubmit
 * @constant handleSubmit
 * @type {function}
 * @default tableData
 * @description Con esta constante enviamos los resultados y cerramos el popUp de añadir
 */
  const handleSubmit = () => {
    // put your validation logic here
    onSubmit(values);
    onClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Create New Wish</DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack
            sx={{
              width: '100%',
              minWidth: { xs: '300px', sm: '360px', md: '400px' },
              gap: '1.5rem',
            }}
          >
            {columns.map((column) => (
              <TextField
                id="name"
                key={column.accessorKey}
                label={column.header}
                name={column.accessorKey}
                onChange={(e) => setValues({
                  ...values,
                  [e.target.name]: e.target.value,
                })}
                onKeyUp={(event) => {
                  if (
                    event.key === 'Enter'
                                        && document.getElementById('name').value
                                          .length > 0
                  ) {
                    handleSubmit();
                  }
                }}
              />
            ))}
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: '1.25rem' }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          color="secondary"
          onClick={handleSubmit}
          variant="contained"
        >
          Create New Wish
        </Button>
      </DialogActions>
    </Dialog>
  );
}

CreateNewAccountModal.propTypes = {
  columns: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
};

CreateNewAccountModal.defaultProps = {
  columns: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default CreateNewAccountModal;
