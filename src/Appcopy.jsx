import React, {
  useCallback, useMemo, useState, useRef,
  useEffect,
} from 'react';
import MaterialReactTable from 'material-react-table';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ExportToCsv } from 'export-to-csv';
import './Appcopy.css';
import {
  Box,
  Button,
  IconButton,
  Tooltip,
  Checkbox,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { data } from './makeData';
import logo from './assets/logo.png';
import ExportButtons from './components/ExportButtons';
import CreateNewAccountModal from './components/CreateNewAccountModal';
import './App.css';

const getLocalItems = () => {
  const list = localStorage.getItem('lists');
  console.log(list);

  if (list) {
    return JSON.parse(localStorage.getItem('lists'));
  }
  return data;
};

function Example() {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [tableData, setTableData] = useState(getLocalItems);
  const [rowSelection, setRowSelection] = useState({});
  const tableInstanceRef = useRef(null);

  const handleCreateNewRow = (values) => {
    tableData.push(values);
    setTableData([...tableData]);
  };

  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    tableData[row.index] = values;

    setTableData([...tableData]);
    exitEditingMode(); // required to exit editing mode and close modal
  };

  const handleDeleteRow = useCallback(
    (row) => {
      if (
        window.confirm(`Are you sure you want to delete ${row.getValue('firstName')}`)
      ) {
        return;
      }
      tableData.splice(row.index, 1);
      setTableData([...tableData]);
    },
    [tableData],
  );

  const columns = useMemo(
    () => [
      {
        accessorKey: 'deseo',
        header: 'Deseo',
        size: 140,
      },
    ],
  );

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
      <div className="container-fluid">
        <img src={logo} width="100px" alt="Logotipo Wishlist" />
        <h3 style={{ marginTop: 20, fontSize: 20 }}>Welcome to my Wishlist</h3>
      </div>
      <MaterialReactTable
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
        editingMode="modal" // default
        enableColumnOrdering
        enableRowOrdering
        enableSorting={false}
        enableEditing
        onEditingRowSave={handleSaveRowEdits}
        enableRowDragging
        enableRowNumbers
        rowNumberMode="static"
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
              data.splice(
                hoveredRow.index,
                0,
                data.splice(draggingRow.index, 1)[0],
              );
              setTableData([...data]);
            }
          },
        })}
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Checkbox defaultChecked />
            <Tooltip arrow placement="left" title="Edit">
              <IconButton onClick={() => table.setEditingRow(row)}>
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement="right" title="Delete">
              <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        onRowSelectionChange={setRowSelection} // hoist internal state to your own state (optional)
        state={{ rowSelection }} // manage your own state, pass it back to the table (optional)
        tableInstanceRef={tableInstanceRef} // get a reference to the underlying table instance (optional)
        renderTopToolbarCustomActions={({ table }) => (

          <Box
            sx={{
              display: 'flex', gap: '1rem', p: '0.5rem', flexWrap: 'wrap',
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
              <ExportButtons table={table} csvOptions={csvOptions} csvExporter={csvExporter} />
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
/*
export function CreateNewAccountModal({
  open, columns, onClose, onSubmit,
}) {
  const [values, setValues] = useState(() => columns.reduce((acc, column) => {
    acc[column.accessorKey ?? ''] = '';
    return acc;
  }, {}));

  const handleSubmit = () => {
    // put your validation logic here
    onSubmit(values);
    onClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Create New Account</DialogTitle>
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
                key={column.accessorKey}
                label={column.header}
                name={column.accessorKey}
                onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
              />
            ))}
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: '1.25rem' }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="secondary" onClick={handleSubmit} variant="contained">
          Create New Account
        </Button>
      </DialogActions>
    </Dialog>
  );
}
*/
export default Example;
