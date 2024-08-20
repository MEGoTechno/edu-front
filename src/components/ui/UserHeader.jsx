import { Avatar, Box, Button, Typography, useTheme } from '@mui/material'
import React, { Children } from 'react'
import { useSelector } from 'react-redux'
import { useOutletContext } from 'react-router-dom'

export default function UserHeader({ children, user, flexDirection, variant }) {

    const isNonMobile = useOutletContext()
    const theme = useTheme()

    return (
        <Box sx={{
            display: 'flex',
            alignItems: "center",
            justifyContent: 'flex-start',
            flexDirection: isNonMobile ? "row" : flexDirection || 'column',
        }}>
            <Avatar alt={user.name.toUpperCase()} src={user?.avatar?.url || "#"}
                sx={{
                    m: '6px',
                    height: "120px",
                    width: "120px",
                    bgcolor: theme.palette.primary[400],
                    fontWeight: 800,
                    fontSize: '25px',
                    color: theme.palette.grey[0],
                }}
            variant={variant || 'square'} />

            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: "center",
                flexDirection: "column"
            }}>

                <Box minWidth={'100%'}>
                    <Typography variant='h5' fontWeight="600" color={theme.palette.neutral[0]}>
                        {user.name}
                    </Typography>
                </Box>

                <Box width={'100%'}>
                    <Typography variant='h6' fontWeight="600" color={theme.palette.text.secondary}>
                        {user.role}<span style={{ opacity: .4 }}> : role </span>
                    </Typography>
                </Box>

            </Box>
            <Box sx={{ flex: 1, textAlign: "center" }}>
                {children}
            </Box>
        </Box>
    )
}
