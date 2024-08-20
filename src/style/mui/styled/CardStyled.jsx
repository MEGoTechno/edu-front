import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'
import Separator from '../../../components/ui/Separator'

function CardStyled({ img, title, description, children, btn1, btn2 }) {
    return (
        <Card sx={{ maxWidth: 400 }}>
            <Box sx={{ p: '16px', overflow: 'hidden' }}>
                <CardMedia
                    sx={{ minHeight: 150, borderRadius: '16px', }}
                    image={'/assets/3rd.jpg' || '#'}
                    title={title || 'thumbnail'}
                />
            </Box>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
                <Separator />
                {children}
            </CardContent>
            <CardActions>
                {btn1} {btn2}
            </CardActions>
        </Card>
    )
}

export default CardStyled
