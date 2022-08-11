import React, { Component, useEffect } from 'react'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import api from '../api/backendInterface'
import Deadline from './Deadline'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider';

function DeadlineList(props) {  
    const [deadlines, setDeadlines] = React.useState([])

    useEffect(() => {
        getDeadlines()
    }, [])

    const getDeadlines = () => {
        api.getStudentDeadlines(1).then(response => {
            if (response.status === 200) {
                const header = [{isHeader:true}]
                const retreivedDeadlines = JSON.parse(response.data)
                setDeadlines(header.concat(retreivedDeadlines))
            }
            console.log(response.message)
        })
    }

    const refreshList = () => {
        getDeadlines()
    }

    const list = () => {
        return (
            <List>
                {deadlines.map(deadline => {
                    return (
                        <div>
                            <Deadline
                                id={deadline.id} 
                                name={deadline.name}
                                module={deadline.module}
                                deadline={deadline.deadline}
                                description={deadline.description}
                                isHeader={deadline.isHeader}
                                refreshList={refreshList}
                            />
                            <Divider />
                        </div>
                    )
                })}
            </List>
        )
    }

    return <Box sx={{width: '100%'}}> {list()} </Box>
}

export default DeadlineList