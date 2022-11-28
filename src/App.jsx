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

const getLocalItems = () => {
  const list = localStorage.getItem('lists');

  if (list) {
    return JSON.parse(localStorage.getItem('lists'));
  }

  return data;
};

/** This is a description of the foo function. */
function Example() {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [tableData, setTableData] = useState(getLocalItems);
  const [rowSelection, setRowSelection] = useState({});
  const tableInstanceRef = useState(getLocalItems);

  const handleDeleteRow = useCallback(
    (row) => {
      if (
        !window.confirm(
          `Are you sure you want to delete ${row.getValue('deseo')}`,
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

  const handleCreateNewRow = (values) => {
    tableData.push(values);
    setTableData([...tableData]);
  };

  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    tableData[row.index] = values;
    localStorage.setItem('lists', JSON.stringify(tableData));
    setTableData([...tableData]);
    exitEditingMode(); // required to exit editing mode and close modal
  };

  const columns = useMemo(() => [
    {
      accessorKey: 'deseo',
      header: 'Deseo',
      size: 140,
    },
  ]);

  const csvOptions = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalSeparator: '.',
    showLabels: true,
    useBom: true,
    useKeysAsHeaders: false,
    headers: columns.map((c) => c.header),
  };

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
              Create New Account
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
