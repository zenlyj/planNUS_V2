import React, { Component } from 'react'
import Popup from 'reactjs-popup'
import Task from './Task'
import Deadline from './Deadline'
import HorizontalMenu from './HorizontalMenu'
import { Button, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import DialogUtils from './DialogUtils'
import DialogContent from '@mui/material/DialogContent'
import { TextareaAutosize } from '@mui/material'

function CalendarDay(props) {
    const [open, setOpen] = React.useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const dateNumberButtonStyle = {   
        background: 'transparent',
        border: 0,
        width:'100%',
        height:'30px',
        color: '#404040',
        fontSize: 20
    }

    return (
        <div>
            <button style={dateNumberButtonStyle} onClick={() => handleClickOpen()}>
                {1}
            </button>
            <DialogUtils.BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                fullWidth={true}
            >
                <DialogUtils.BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {/* {`${props.dayOfWeek} ${props.date}`} */}
                    Wednesday 2022-12-12
                </DialogUtils.BootstrapDialogTitle>
                <DialogContent dividers>
                    <Box>
                        <Typography sx={{padding:'5%'}} variant="h6">
                            Tasks
                        </Typography>
                        <HorizontalMenu limit={1} items={[<Button> Hey </Button>]} />
                    </Box>
                    <Box>
                        <Typography sx={{padding:'5%'}} variant="h6">
                            Deadline
                        </Typography>
                        <HorizontalMenu limit={1} items={[<Button> there </Button>]}/>
                    </Box>
                    <Box>
                        <TextareaAutosize
                            aria-label="minimum height"
                            minRows={3}
                            placeholder='Diary Entry'
                            style={{width:'60%', marginTop:'5%', marginLeft:'5%'}}
                        />
                    </Box>
                </DialogContent>
            </DialogUtils.BootstrapDialog>
        </div>
    )
}

export default CalendarDay