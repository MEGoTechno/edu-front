import { Typography, useTheme } from '@mui/material'
import React from 'react'

function TextBorderAround({ children }) {

    const theme = useTheme()

    return (
        <Typography variant='h5'
            color={'primary.main'}
            my={'10px'} sx={{
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                position: 'relative',
                '&:before, &:after': {
                    content: '""',
                    position: 'absolute',
                    width: '50%', height: '100%',
                    borderColor: 'primary.main'
                },
                '&:before': {
                    top: '-10px', left: "-10px",
                    borderTop: '4px solid ',
                    borderLeft: '4px solid ',
                },
                '&:after': {
                    bottom: '-10px', right: "-10px",
                    borderTop: '4px solid ',
                    borderLeft: '4px solid ',
                    transform: 'rotate(180deg)'
                }
            }} >

            {children}
        </Typography>
    )
}

export default TextBorderAround
