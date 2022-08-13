import React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { Button, Typography } from '@mui/material'

function HorizontalMenu(props) {
    const [page, setPage] = React.useState(1)
    
    const gridItems = () => {
        const gridItems = []
        for (let i = (page-1)*props.limit; i < props.items.length && i < props.limit*page; i++) {
            console.log(i)
            gridItems.push(
                <Grid item xs={8/props.limit}> {props.items[i]} </Grid>
            )
        }
        return gridItems
    }

    const handleLeftNav = () => {
        const targetPage = page-1
        setPage(targetPage <= 0 ? 1 : targetPage)
    }

    const handleRightNav = () => {
        const targetPage = page+1
        setPage(targetPage*props.limit > props.items.length ? page : targetPage)
    }

    return (
        <Box textAlign='center'>
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <Button onClick={() => handleLeftNav()}> {'<'} </Button>
                </Grid>                
                {gridItems()}
                <Grid item xs={2}>
                    <Button onClick={() => handleRightNav()}> {'>'} </Button>
                </Grid>                
            </Grid>
        </Box>
    )
}

export default HorizontalMenu
