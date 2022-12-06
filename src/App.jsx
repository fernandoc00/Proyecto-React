import React, {
  useCallback, useMemo, useState, useEffect,
} from 'react';
import MaterialReactTable from 'material-react-table';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ExportToCsv } from 'export-to-csv';
import { Box, Button } from '@mui/material';
import { data } from './makeData';
import logo from './assets/logo.png';
import ExportButtons from './components/ExportButtons';
import CreateNewAccountModal from './components/CreateNewAccountModal';
import DeleteAccountModal from './components/DeleteAccountModal';
import './App.css';
import EditAccountModal from './components/EditAccountModal';

/**
 * getLocalItems
 * @constant getLocalItems
 * @type {state}
 * @default data
 * @return data || localStorage.getItem('lists)
 * @description Con esta constante obtendremos el valor acumulado de la lista del localstorage o devolveremos la acumulada en la App si no existe ninguna
 */
const getLocalItems = () => {
  const list = localStorage.getItem('lists');

  if (list) {
    return JSON.parse(localStorage.getItem('lists'));
  }

  return data;
};

/** This is a description of the app function. */
/**
 *
 *  @fileoverview App app, lista de tareas para un usuario

 *

 * @version                               2.2

 *

 * @author                 Fernando Caravaca <info@fernandocaravaca.com>

 * @copyright           fernandocaravaca.com

 *

 * @description

 * v2.2 – Se mejoró la APP tras confirmar que el lint y el prettier no daban fallo
 *
 * v2.0 – Se modularizó la APP y se crearon los distintos componentes Create, Delete, Edit y Export
 *
 * v1.1 – Se desarrollo la tabla del Material React Table
 *
 * ----

 * La primera versión de Wishlist fue escrita por Fernando Caravaca

 * Manage a wishlist
 * @returns HTML with a WishList
 */

/**

 * Función principal para lanzar el proyecto

 *

 * @return  {html}

 */
function Example() {
  /**
 * CreateModal
 * @constant
 * @type {useState}
 * @default useState(false)
 * @description Con esta constante obtenemos el estado inicial para createModalopen
 */
  const [createModalOpen, setCreateModalOpen] = useState(false);
  /**
 * setTableData
 * @constant setTableData
 * @type {useState}
 * @default useState(getLocalItems)
 * @description Con esta constante obtenemos el estado inicial para setTableData, que en este caso será las variables almacenadas en LocalStorage
 */
  const [tableData, setTableData] = useState(getLocalItems);
  /**
 * setRowSelection
 * @constant setRowSelection
 * @type {useState}
 * @default useState(false)
 * @description Con esta constante obtenemos el estado inicial para setRowSelection
 */
  const [rowSelection, setRowSelection] = useState({});
  /**
 * tableInstanceRef
 * @constant
 * @type {useState}
 * @default useState(getLocalItems)
 * @description Con esta constante obtenemos el estado inicial para tableInstanceRef
 */
  const tableInstanceRef = useState(getLocalItems);
  /**
 * handleDeleteRow
 * @constant handleDeleteRow
 * @type {useCallback}
 * @default tableData
 * @return tableData
 * @description Con esta constante obtenemos el estado inicial para handleDeleteRow
 */
  const handleDeleteRow = useCallback(
    (row) => {
      console.log(row);
      if (
        !window.confirm(
          `Are you sure you want to delete ${row.getValue('wish')}`,
        )
      ) {
        return;
      }
      // send api delete request here, then refetch or update local table data for re-render
      tableData.splice(row.index, 1);
      localStorage.setItem('lists', JSON.stringify(tableData));
      setTableData([...tableData]);
    },
    [tableData],
  );

  /**
 * handleCreateNewRow
 * @constant handleCreateNewRow
 * @type {tableData}
 * @default tableData
 * @return tableData
 * @description Con esta constante insertaremos un nuevo valor para nuestra tabla
 */
  const handleCreateNewRow = (values) => {
    tableData.push(values);
    setTableData([...tableData]);
  };

  /**
 * handleSaveRowEdits
 * @constant handleSaveRowEdits
 * @type {tableData}
 * @default tableData
 * @return tableData
 * @description Con esta constante crearemos un nuevo valor para nuestra tabla y lo guardaremos
 */
  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    tableData[row.index] = values;
    localStorage.setItem('lists', JSON.stringify(tableData));
    setTableData([...tableData]);
    exitEditingMode(); // required to exit editing mode and close modal
  };
  /**
 * handleSaveRowEdits
 * @constant columns
 * @type {object}
 * @default useMemo
 * @description Con esta constante defineremos nuestra única columna disponible
 */
  const columns = useMemo(() => [
    {
      accessorKey: 'wish',
      header: 'Wish',
      size: 140,
    },
  ]);
  /**
 * csvOptions
 * @constant csvOptions
 * @type {object}
 * @description Con esta constante definimos las opciones para exportar nuestra tabla a fichero csv
 */
  const csvOptions = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalSeparator: '.',
    showLabels: true,
    useBom: true,
    useKeysAsHeaders: false,
    headers: columns.map((c) => c.header),
  };

  /**
 * csvExporter
 * @constant csvExporter
 * @type {object}
 * @description Con esta constante llamaremos al plugin exporttocsv y le pasaremos las opciones definidas anteriormente
 */
  const csvExporter = new ExportToCsv(csvOptions);

  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(tableData));
  }, [tableData]);

  return (
    <>
      <div className="inner-header flex">
        <h1>Welcome to my Wishlist</h1>
      </div>
      <div className="container-fluid">
        <img
          src={logo}
          width="150px"
          alt="Logotipo Wishlist"
          style={{ marginBottom: '50px' }}
        />
      </div>
      <MaterialReactTable
        className="tabla"
        displayColumnDefOptions={{
          'mrt-row-actions': {
            muiTableHeadCellProps: {
              align: 'center',
            },
            size: 0,
          },
        }}
        autoResetPageIndex={false}
        columns={columns}
        data={tableData}
        enableRowSelection
        muiSelectCheckboxProps={() => ({
          color: 'error',
        })}
        editingMode="modal" // default
        enableColumnOrdering
        enableRowOrdering
        enableSorting={false}
        enableEditing
        onEditingRowSave={handleSaveRowEdits}
        enableRowDragging
        enableRowNumbers
        rowNumberMode="static"
        muiTableBodyProps={{
          sx: {
            // stripe the rows, make odd rows a darker color
          },
        }}
        muiTableBodyRowProps={({ row }) => ({
          onClick: (event) => {
            console.info(event, row.id);
          },
          sx: {
            cursor: 'pointer', // you might want to change the cursor too when adding an onClick
          },
        })}
        muiTableBodyRowDragHandleProps={({ table }) => ({
          onDragEnd: () => {
            const { draggingRow, hoveredRow } = table.getState();
            if (hoveredRow && draggingRow) {
              tableData.splice(
                hoveredRow.index,
                0,
                tableData.splice(draggingRow.index, 1)[0],
              );
              setTableData([...tableData]);
            }
          },
        })}
        renderRowActions={({ row, table }) => (
          <Box
            sx={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
            }}
          >
            <EditAccountModal table={table} row={row} />
            <DeleteAccountModal
              handleDeleteRow={handleDeleteRow}
              row={row}
            />
          </Box>
        )}
        onRowSelectionChange={setRowSelection} // hoist internal state to your own state (optional)
        state={{ rowSelection }} // manage your own state, pass it back to the table (optional)
        tableInstanceRef={tableInstanceRef} // get a reference to the underlying table instance (optional)
        renderTopToolbarCustomActions={({ table }) => (
          <Box
            sx={{
              display: 'flex',
              gap: '1rem',
              p: '0.5rem',
              flexWrap: 'wrap',
            }}
          >
            <Button
              color="secondary"
              onClick={() => setCreateModalOpen(true)}
              variant="contained"
            >
              Create New Wish
            </Button>
            <div>
              <ExportButtons
                table={table}
                csvOptions={csvOptions}
                csvExporter={csvExporter}
              />
            </div>
          </Box>
        )}
      />

      <CreateNewAccountModal
        columns={columns}
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateNewRow}
      />
    </>
  );
}

// example of creating a mui dialog modal for creating new rows
export default Example;
