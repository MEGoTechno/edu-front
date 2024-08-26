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
import { useSelector } from 'react-redux'
import { lang } from '../../settings/constants/arlang'

function UserCourseDetails({ course, subscribedAt }) {
    const navigate = useNavigate()
    // const { user } = useSelector(s => s.global)

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
        <CardStyled img={'/assets/course.png'} title={<Button startIcon={<RtArrow size='1.5rem' />} endIcon={<CoursesIcon size='1.5rem' />} sx={{ color: 'primary.main' }}
            component={Link} to={"courses/" + course.index} onClick={goCourse}
        >

            {/* course Name */}
            <FlexRow>
                {/* <Typography variant='body1' color={'grey.100'} sx={{opacity: '.7'}}>Course Name: </Typography> */}
                <Typography variant='h6' color={'neutral.0'}> {course.name}</Typography>
            </FlexRow>

        </Button>}
            // btn2={!subscribedAt && (<OutLinedHoverBtn sx={{ width: '100%' }} endIcon={<MdOutlinePayment />} >subsrcibe</OutLinedHoverBtn>)}
            btn1={
                <FilledHoverBtn FilledHoverBtn sx={{ width: '100%' }} component={Link} to={"courses/" + course.index} onClick={goCourse} endIcon={< FaArrowRight />} > الذهاب للكورس  </FilledHoverBtn >
            }>

            <FlexColumn>

                <FlexBetween gap={'12px'} mt={'16px'}>
                    <TabInfo count={lecturesCount} i={'1'} title={lang.LECTURES} icon={<VidsIcon2 size='1.5rem' />} />
                    <TabInfo count={'0'} i={'2'} title={lang.FILES} icon={<FilesIcon size={'1.5rem'} />} />
                    <TabInfo count={'0'} i={'3'} title={lang.EXAMS} icon={<ExamIcon size='1.5rem' />} />
                    <TabInfo count={getFullDate(course.createdAt)} i={'1'} title={'تاريخ انشاء الكورس'} icon={<MdDateRange size='1rem' />} isBold={false} />
                    {subscribedAt && (
                        <TabInfo count={getFullDate(subscribedAt)} i={'2'} title={'تاريخ الاشتراك بالكورس'} icon={<MdDateRange size='1rem' />} isBold={false} />
                    )}
                </FlexBetween>
                {!subscribedAt && (
                    <Box mt={'20px'}>

                        <RowInfo title={'سعر الكورس'} desc={<Typography variant='subtitle2' >{course.price} جنيها</Typography>} icon={<AiFillPoundCircle size='1rem' />} bgcolor='primary.500' />
                        {(course.preDiscount !== course.price + 1) && (
                            <>
                                <Separator sx={{ width: '100px', borderWidth: '2px', mr: 'auto' }} />
                                <TabInfo title={lang.PRE_DISCOUNT} count={course.preDiscount + ' $'} icon={<AiFillPoundCircle size={'1.5rem'} />} i={0} sx={{ mr: 'auto' }} />
                            </>
                        )}
                    </Box>
                )}

            </FlexColumn>
        </CardStyled >
    )
}

//sx={{textDecorationLine: 'line-through', color: 'red'}}
// lectures, exams, files
export default UserCourseDetails
