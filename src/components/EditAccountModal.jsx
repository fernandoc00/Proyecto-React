import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { IconButton, Tooltip } from '@mui/material';
import PropTypes from 'prop-types';

import { Edit } from '@mui/icons-material';

/** This is a description of the EditAccountModal . */
/**
 *
 *  @fileoverview EditAccountModal.jsx, botones para eliminar un deseo

 *

 * @version  2.2

 *

 * @author                 Fernando Caravaca <info@fernandocaravaca.com>

 * @copyright           fernandocaravaca.com

 *

 * @description

 * En este componente encontramos un botón que permite al usuario editar el deseo que el mismo desee. Lo haremos ofreciendole
la opción a través de un botón con un icono de edición a la izquierda del deseo.

 * Botones para editar un deseo
 * @returns HTML with Buttons
 */

/**

 * Función principal que mostrará los botones de edición

 *

 * @return  {html}

 */
function EditAccountModal({ table, row }) {
  return (
    <Tooltip arrow placement="left" title="Edit">
      <IconButton onClick={() => table.setEditingRow(row)}>
        <Edit />
      </IconButton>
    </Tooltip>
  );
}

EditAccountModal.propTypes = {
  table: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  row: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  setEditingRow: PropTypes.func,
};

EditAccountModal.defaultProps = {
  table: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  row: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  setEditingRow: PropTypes.func,
};

export default EditAccountModal;
