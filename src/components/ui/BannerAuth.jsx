import { Box } from '@mui/material'
import React from 'react'

function BannerAuth({ img }) {
    return (
        <Box sx={{
            height: 'auto', minHeight: {xs: '40vh', md: '80vh'}, width: '100%', maxWidth: { xs: '100%', md: '400px' }, bgcolor: 'orange', borderRadius: '16px'
        }}>
        </Box>
    )
}

export default BannerAuth
