import { Box, Typography, useTheme } from '@mui/material'
import React from 'react'

function BannerIcon({ icon }) {
    const theme = useTheme()
    return (
        <Box
            sx={{
                justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: "column",
                minWidth: "250px", maxWidth: '400px', minHeight: '100px', borderRadius: '16px',
                bgcolor: 'orange', m: '30px auto', boxShadow: theme.shadows[8]
            }}>
            {icon}
            <Typography variant='h5' color={'grey.0'}>create new user</Typography>
        </Box>
    )
}

export default BannerIcon
