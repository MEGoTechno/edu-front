import { Box, Card, CardActionArea, CardContent, CardMedia, Divider, Paper, Typography, useTheme } from '@mui/material'
import React from 'react'
import Grid from '../../style/vanilla/Grid'
import CardHover from '../ui/CardHover'
import gradeConstants from '../../settings/constants/gradeConstants'


const FIRST_GRADE_BODY = 'اضغط للوصول الي جميع الكورسات و الوحدات الخاصه'

function Grades() {

    const theme = useTheme()

    return (
        <Box sx={{ minHeight: '100vh' }}>
            <Grid>
                {gradeConstants && gradeConstants.map((grade, i) => (
                    <CardHover key={i} img={grade.img} title={grade.name} desc={FIRST_GRADE_BODY} to={'/grades/' + grade.index} />
                ))}
            </Grid>
        </Box>
    )
}

//clipPath: 'circle(71% at 50% 6%)', aspectRatio: '1 / 1',
// img title number of units
export default Grades
