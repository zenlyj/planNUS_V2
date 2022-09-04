import React, { Component } from 'react'
import { Button } from '@mui/material'
import DialogUtils from './DialogUtils'
import TextField from '@mui/material/TextField'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import api from '../api/backendInterface'
import session from '../SessionUtil'

function TaskImport(props) {
    const [url, setURL] = React.useState('')
    const [open, setOpen] = React.useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleImport = () => {
        const studentId = session.studentId()
        api.importNusMods(studentId, url)
            .then(response => {
                console.log(response.message)
                if (response.status === 200) {
                    props.refresh()
                    handleClose()
                }
            })
    }

    return (
        <div>
            <Button variant="contained" color="success" onClick={() => handleClickOpen()}>
                Import
            </Button>
            <DialogUtils.BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogUtils.BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    NUSMODS Import
                </DialogUtils.BootstrapDialogTitle>
                <DialogContent dividers>
                    <TextField 
                        autoFocus
                        margin="dense"
                        id="url"
                        label="NUSMODS Share Link"
                        type="url"
                        fullWidth
                        variant="standard"
                        onChange={e => setURL(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleImport()}> Import </Button>
                </DialogActions>
            </DialogUtils.BootstrapDialog>
        </div>
    )
}

export default TaskImport