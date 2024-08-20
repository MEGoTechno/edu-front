import { Box, useTheme } from '@mui/material'
import React from 'react'

function Banner() {
    const theme = useTheme()
    return (
        <Box sx={{
            borderRadius: '50%',
            border: '2px solid transparent',
            boxShadow: theme.shadows[2], overflow: 'hidden',
            display: 'flex', justifyContent: 'center', bgcolor: 'primary.main',
            flexBasis: '40%',
        }}>
            <img style={{
                objectFit: 'cover'
            }} src={"./assets/bill.png"} />
        </Box>
    )
}

export default Banner
