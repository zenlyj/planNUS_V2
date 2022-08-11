import React, { Component, useEffect } from 'react'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import api from '../api/backendInterface'
import DialogUtils from './DialogUtils'
import TextField from '@mui/material/TextField'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import { Button, Typography } from '@mui/material'

function Deadline(props) {
    const [open, setOpen] = React.useState(false)
    const [id, setId] = React.useState(-1)
    const [name, setName] = React.useState('')
    const [module, setModule] = React.useState('')
    const [deadline, setDeadline] = React.useState('')
    const [description, setDescription] = React.useState('')

    const handleClickOpen = () => {
        setId(props.id)
        setName(props.name)
        setModule(props.module)
        setDeadline(props.deadline)
        setDescription(props.description)
        setOpen(true)
    } 

    const handleClose = () => {
        setOpen(false)
        props.refreshList()
    }

    const handleSave = () => {
        let response = null
        if (props.isHeader) {
            response = api.addDeadline(name, module, deadline, description)
        } else {
            response = api.updateDeadline(id, name, module, deadline, description)
        }
        response.then(response => {
            if (response.status === 200) {
                handleClose()
            }
            console.log(response.message)
        })
    }

    const handleDelete = () => {
        api.deleteTask(id).then(response => {
            if (response.status === 200) {
                handleClose()
            }
            console.log(response.message)
        })
    }

    const listItem = () => {
        const primaryText = props.isHeader ? 'Deadlines' : props.name
        let secondaryText = <div>
            <div> {props.module} </div>
            <div> {props.deadline} </div>
        </div>
        if (props.isHeader) {
            secondaryText = <Typography textAlign={'right'}> + </ Typography>
        }

        return <ListItem>
            <ListItemButton onClick={() => handleClickOpen()}>  
                <ListItemText primary={primaryText} secondary={secondaryText}/>
            </ListItemButton>
        </ListItem>
    }

    return (
        <div>
            {listItem()}
            <DialogUtils.BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogUtils.BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    { props.isHeader ? 'New Deadline' : props.name }
                </DialogUtils.BootstrapDialogTitle>
                <DialogContent dividers>
                    <TextField 
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        type="name"
                        fullWidth
                        variant="standard"
                        onChange={e => setName(e.target.value)}
                        defaultValue={props.name}
                    />
                    <TextField 
                        autoFocus
                        margin="dense"
                        id="module"
                        label="Module"
                        type="module"
                        fullWidth
                        variant="standard"
                        onChange={e => setModule(e.target.value)}
                        defaultValue={props.module}
                    />
                    <TextField 
                        autoFocus
                        margin="dense"
                        id="deadline"
                        label="Deadline"
                        type="deadline"
                        fullWidth
                        variant="standard"
                        onChange={e => setDeadline(e.target.value)}
                        defaultValue={props.deadline}
                    />
                    <TextField 
                        autoFocus
                        margin="dense"
                        id="description"
                        label="Description"
                        type="description"
                        fullWidth
                        variant="standard"
                        onChange={e => setDescription(e.target.value)}
                        defaultValue={props.description}
                    />                    
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleSave()}>
                        Save
                    </Button>
                    {
                        props.isHeader ? null : 
                            <Button onClick={() => handleDelete()}> 
                                Delete 
                            </Button>
                    }
                </DialogActions>
            </DialogUtils.BootstrapDialog>
        </div>
    ) 
}

export default Deadline