import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import { data } from '../makeData';

/** This is a description of the export buttons. */
/**
 *
 *  @fileoverview ExportButtons.jsx, botones para exportar a CSV

 *

 * @version  2.2

 *

 * @author                 Fernando Caravaca <info@fernandocaravaca.com>

 * @copyright           fernandocaravaca.com

 *

 * @description

 * Se desarrolló el componente donde aparecen los 4 botones con distintas opciones para exportar el código a formato csv.
Cada botón ofrece al usuario distintas formas para exportar la tabla de deseos a formato CSV. Toda la tabla, solo la
vista que se está mostrando, las filas seleccionadas, etc..

 * Botones para exportar
 * @returns HTML with Buttons
 */

/**

 * Función principal que mostrará los botones de exportación

 *

 * @return  {html}

 */
function ExportButtons({ table, csvExporter }) {
  /**
 * handleExportRows
 * @constant handleExportRows
 * @type {function}
 * @default rows
 * @description Con esta constante recogemos las filas para exportar
 */
  const handleExportRows = (rows) => {
    csvExporter.generateCsv(rows.map((row) => row.original));
  };
  /**
 * handleExportRows
 * @constant handleExportRows
 * @type {function}
 * @default
 * @description Con esta constante exportamos nuestros datos de la tabla a csv
 */
  const handleExportData = () => {
    csvExporter.generateCsv(data);
  };
  return (
    <div>
      <Button
        color="primary"
                // export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
        onClick={handleExportData}
        startIcon={<FileDownloadIcon />}
        variant="contained"
      >
        Export All Data
      </Button>
      <Button
        disabled={table.getPrePaginationRowModel().rows.length === 0}
                // export all rows, including from the next page, (still respects filtering and sorting)
        onClick={() => handleExportRows(table.getPrePaginationRowModel().rows)}
        startIcon={<FileDownloadIcon />}
        variant="contained"
      >
        Export All Rows
      </Button>
      <Button
        disabled={table.getRowModel().rows.length === 0}
                // export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
        onClick={() => handleExportRows(table.getRowModel().rows)}
        startIcon={<FileDownloadIcon />}
        variant="contained"
      >
        Export Page Rows
      </Button>
      <Button
        disabled={
                    !table.getIsSomeRowsSelected()
                    && !table.getIsAllRowsSelected()
                }
                // only export selected rows
        onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
        startIcon={<FileDownloadIcon />}
        variant="contained"
      >
        Export Selected Rows
      </Button>
    </div>
  );
}

ExportButtons.propTypes = {
  table: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  csvExporter: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

ExportButtons.defaultProps = {
  table: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  csvExporter: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default ExportButtons;
