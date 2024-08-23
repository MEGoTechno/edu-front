import React, { useEffect, useState } from 'react'

import { Box, Button, Typography } from '@mui/material'
import { RtArrow } from '../header/Icons'
import { Link, useNavigate } from 'react-router-dom'

import { CoursesIcon, ExamIcon, ExamIconOutlined, FilesIcon, VidsIcon, VidsIcon2 } from '../ui/svg/ContentSvgs'
import { GoFileSubmodule } from "react-icons/go";
import { FaArrowRight } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import { AiFillPoundCircle } from "react-icons/ai";
import { MdDateRange } from "react-icons/md";


import { FlexBetween, FlexColumn, FlexRow } from '../../style/mui/styled/Flexbox'
import Separator from '../ui/Separator'
import AccordionStyled from '../../style/mui/styled/AccordionStyled'
import CardStyled from '../../style/mui/styled/CardStyled'
import TabInfo from '../ui/TabInfo'
import RowInfo from '../ui/RowInfo'
import { dateOptions, getFullDate } from '../../settings/constants/dateConstants'
import { useLazyGetLecturesCountQuery } from '../../toolkit/apis/statisticsApi'
import useLazyGetData from '../../hooks/useLazyGetData'
import { FilledHoverBtn, OutLinedHoverBtn } from '../../style/mui/btns/buttonsStyles'

function UserCourseDetails({ course }) {

    const navigate = useNavigate()

    const goCourse = (e) => {
        e.preventDefault()
        navigate("courses/" + course.index, { state: course })
    }
    const [getData] = useLazyGetLecturesCountQuery()
    const [getLecturesCount] = useLazyGetData(getData)

    const [lecturesCount, setLecturesCount] = useState('loading ..')
    useEffect(() => {

        const trigger = async () => {
            const { count } = await getLecturesCount({ course: course._id })
            setLecturesCount(count)
        }

        if (course) {
            trigger()
        }
    }, [course])

    if (!course) return <>loading ...!</>

    return (
        <CardStyled img={'/assets/3rd.jpg'} title={<Button startIcon={<RtArrow size='1.5rem' />} endIcon={<CoursesIcon size='1.5rem' />} sx={{ color: 'primary.main' }}
            component={Link} to={"courses/" + course.index} onClick={goCourse}
        >

            {/* course Name */}
            <FlexRow>
                {/* <Typography variant='body1' color={'grey.100'} sx={{opacity: '.7'}}>Course Name: </Typography> */}
                <Typography variant='h6' color={'neutral.0'}> {course.name}</Typography>
            </FlexRow>

        </Button>}
            btn2={<OutLinedHoverBtn sx={{ width: '100%' }} endIcon={<MdOutlinePayment />} >subsrcibe</OutLinedHoverBtn>}
            btn1={<FilledHoverBtn sx={{ width: '100%' }} endIcon={<FaArrowRight />}>go to course</FilledHoverBtn>
            }>

            <FlexColumn>

                <FlexBetween gap={'12px'} mt={'16px'}>
                    <TabInfo count={lecturesCount} i={'3'} title={'lectures'} icon={<VidsIcon2 size='1.5rem' />} />
                    <TabInfo count={'10'} i={'3'} title={'files'} icon={<FilesIcon size={'1.5rem'} />} />
                    <TabInfo count={'10'} i={'3'} title={'Exams'} icon={<ExamIcon size='1.5rem' />} />
                    <TabInfo count={getFullDate(course.createdAt)} i={'1'} title={'تاريخ انشاء الكورس'} icon={<MdDateRange size='1rem' />} isBold={false} />
                </FlexBetween>
                <Box mt={'20px'}>

                    <RowInfo title={'سعر الكورس'} desc={<Typography variant='subtitle2' >120 جنيها</Typography>} icon={<AiFillPoundCircle size='1rem' />} bgcolor='primary.500' />
                    {course.discount && course.discount}
                </Box>
            </FlexColumn>
        </CardStyled>
    )
}

//sx={{textDecorationLine: 'line-through', color: 'red'}}
// lectures, exams, files
export default UserCourseDetails
