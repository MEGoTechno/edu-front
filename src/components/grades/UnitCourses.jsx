import React, { useEffect, useState } from 'react'
import AccordionStyled from '../../style/mui/styled/AccordionStyled'
import { Box, Button, Typography } from '@mui/material'
import { RtArrow } from '../header/Icons'
import { CoursesIcon } from '../ui/svg/ContentSvgs'
import { Link } from 'react-router-dom'
import { FlexRow } from '../../style/mui/styled/Flexbox'
import Separator from '../ui/Separator'
import { useLazyGetCoursesQuery } from '../../toolkit/apis/coursesApi'
import useLazyGetData from '../../hooks/useLazyGetData'
import UserCourseDetails from '../courses/UserCourseDetails'
import Grid from '../../style/vanilla/Grid'

function UnitCourses({ unit }) {

    const [open, setOpen] = useState(false)
    const [courses, setCourses] = useState([])

    const [getCoursesFc, status] = useLazyGetCoursesQuery()
    const [getCourses] = useLazyGetData(getCoursesFc)



    useEffect(() => {
        const getCourse = async () => {
            const { courses, count } = await getCourses({ unit: unit._id })
            setCourses(courses)
        }

        if (open && courses.length === 0) {
            getCourse()
        }
    }, [open])


    return (
        <AccordionStyled title={unit.name} bgcolor="background.alt" expanded={open} setExpanded={setOpen}>
            <Grid>
                {courses.map((course, i) => <UserCourseDetails key={i} course={course} />)}
                {courses.map((course, i) => <UserCourseDetails key={i} course={course} />)}
            </Grid>
        </AccordionStyled>
    )
}

export default UnitCourses
