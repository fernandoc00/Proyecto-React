import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    TextField,
} from '@mui/material'
import PropTypes from 'prop-types'

function CreateNewAccountModal({ open, columns, onClose, onSubmit }) {
    const [values, setValues] = useState(() =>
        columns.reduce((acc, column) => {
            acc[column.accessorKey ?? ''] = ''
            return acc
        }, {})
    )

    const handleSubmit = () => {
        // put your validation logic here
        onSubmit(values)
        onClose()
    }

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
                                id="name"
                                key={column.accessorKey}
                                label={column.header}
                                name={column.accessorKey}
                                onChange={(e) =>
                                    setValues({
                                        ...values,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                                onKeyUp={(event) => {
                                    if (
                                        event.key === 'Enter' &&
                                        document.getElementById('name').value
                                            .length > 0
                                    ) {
                                        handleSubmit()
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
    )
}

CreateNewAccountModal.propTypes = {
    columns: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    open: PropTypes.bool,
    onClose: PropTypes.func,
    onSubmit: PropTypes.func,
}

CreateNewAccountModal.defaultProps = {
    columns: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    open: PropTypes.bool,
    onClose: PropTypes.func,
    onSubmit: PropTypes.func,
}

export default CreateNewAccountModal
