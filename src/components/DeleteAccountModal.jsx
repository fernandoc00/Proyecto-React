import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { IconButton, Tooltip } from '@mui/material';
import { Delete } from '@mui/icons-material';
import PropTypes from 'prop-types';

/** This is a description of the DeleteAccountModal . */
/**
 *
 *  @fileoverview DeleteAccountModal.jsx, botones para eliminar un deseo

 *

 * @version  2.2

 *

 * @author                 Fernando Caravaca <info@fernandocaravaca.com>

 * @copyright           fernandocaravaca.com

 *

 * @description

 * En este componente encontramos un botón que permite al usuario eliminar el deseo que el desee. Lo haremos ofreciendole
la opción a través de un botón con un icono de eliminar a la izquierda del deseo.

 * Botones para eliminar un deseo
 * @returns HTML with Buttons
 */

/**

 * Función principal que mostrará los botones de borrado

 *

 * @return  {html}

 */
function DeleteAccountModal({ handleDeleteRow, row }) {
  return (
    <Tooltip arrow placement="right" title="Delete">
      <IconButton color="error" onClick={() => handleDeleteRow(row)}>
        <Delete />
      </IconButton>
    </Tooltip>
  );
}

DeleteAccountModal.propTypes = {
  row: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  handleDeleteRow: PropTypes.func,
};

DeleteAccountModal.defaultProps = {
  row: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  handleDeleteRow: PropTypes.func,
};

export default DeleteAccountModal;
