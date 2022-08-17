import { TextField, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import React from 'react'
import api from '../api/backendInterface'
import {Redirect} from 'react-router-dom'

function RegisterPage(props) {
    const [isCompleted, setIsCompleted] = React.useState(false)
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')

    const register = () => {
        api.registerStudentAccount(username, password)
            .then(response => {
                console.log(response.message)
                setIsCompleted(true)
            })
    }

    return (
            <Box 
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
            >
                {isCompleted ? <Redirect to="/login"/> :
                <Grid minHeight="70vh">
                    <Grid item xs="auto">
                        <Typography variant="h4"> Account Registration </Typography>
                    </Grid>
                    <Grid item xs="auto" sx={{marginTop:'20%'}}>
                        <TextField 
                            id="standard-username-input"
                            label="Username"
                            variant="standard"
                            sx={{width:'35em'}}
                            onChange={e => setUsername(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs="auto" sx={{marginTop:'10%'}}>
                        <TextField
                            id="standard-password-input"
                            label="Password"
                            type="password"
                            variant="standard"
                            sx={{width:'35em'}}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs="auto" textAlign={'right'} sx={{marginTop:'5%'}}>
                        <Button onClick={() => register()}>
                            Register
                        </Button>
                    </Grid>
                </Grid>
                }
            </Box>
    )
}

export default RegisterPage