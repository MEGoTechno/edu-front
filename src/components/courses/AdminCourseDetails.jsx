import React, { useEffect, useState } from 'react'
import TitleWithDividers from '../ui/TitleWithDividers'
import { FlexBetween, FlexColumn } from '../../style/mui/styled/Flexbox'
import { OutLinedHoverBtn } from '../../style/mui/btns/buttonsStyles'
import TabInfo from '../ui/TabInfo'
import Separator from '../ui/Separator'
import CourseUpdate from './CourseUpdate'

import { useLazyGetOneCourseQuery } from '../../toolkit/apis/coursesApi'
import useLazyGetData from "../../hooks/useLazyGetData"
import Text from '../../tools/text/Text'
import LoaderWithText from '../../style/mui/loaders/LoaderWithText'
import { Alert } from '@mui/material'
import { lang } from '../../settings/constants/arlang'

import { FcStatistics } from "react-icons/fc";


function AdminCourseDetails({ courseId }) {

    const [course, setCourse] = useState(null)
    const [getData, status] = useLazyGetOneCourseQuery()
    const [getOneCourse] = useLazyGetData(getData)

    useEffect(() => {

        const trigger = async () => {
            const res = await getOneCourse({ id: courseId }, false)
            setCourse(res)
        }
        trigger()

    }, [courseId])

    if (status.isLoading) return <LoaderWithText />

    if (status.isSuccess && !course) return <Alert variant="filled" severity="warning" sx={{ justifyContent: 'center' }}>
        {lang.NO_COURSES_IN_THIS_UNIT}
    </Alert>

    if (course)
        return (
            <>
                <TitleWithDividers title={lang.COURSE_DETAILS + " : " + course.name} />
                <FlexColumn>

                    <FlexBetween width={"100%"}>
                        <OutLinedHoverBtn sx={{ my: '12px' }} colorm='orange' endIcon={<FcStatistics />}>{lang.STATISTICS}</OutLinedHoverBtn>
                        <TabInfo count={'2000'} title={lang.SUBSCRIBERS_NUMS} i={2} />
                        <TabInfo count={course?.isActive ? lang.ACTIVE : lang.NOT_ACTIVE} title={lang.IS_ACTIVE} i={1} />
                        <TabInfo count={course.price + " " + lang.POUND} title={lang.PRICE} i={0} />
                    </FlexBetween>

                    <Separator />
                    <CourseUpdate course={course} />
                </FlexColumn>
            </>
        )
}

export default AdminCourseDetails
