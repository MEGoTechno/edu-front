import React, { lazy, useEffect, useState } from 'react'
import Section from "../../style/mui/styled/Section"
import { FlexBetween, FlexColumn, FlexRow } from "../../style/mui/styled/Flexbox"
import BannerIcon from '../../components/ui/BannerIcon'
import MakeSelect from '../../style/mui/styled/MakeSelect'
import { Box, Button, Paper, Typography } from '@mui/material'
import TabsStyled from '../../style/mui/styled/TabsStyled'
import GradesTabs from '../../components/grades/GradesTabs'
import { useLazyGetCoursesCountQuery } from '../../toolkit/apis/statisticsApi'
import useLazyGetData from '../../hooks/useLazyGetData'
import SelectUnit from '../../components/courses/SelectUnit'
import SelectCourse from '../../components/courses/SelectCourse'
import CardCourse from '../../components/ui/CardCourse'
import CardStyled from '../../style/mui/styled/CardStyled'
import AdminLectures from '../../components/courses/AdminLectures'
import TabInfo from '../../components/ui/TabInfo'
import { FilledHoverBtn, OutLinedHoverBtn, StyledBtn } from '../../style/mui/btns/buttonsStyles'
import TitleWithDividers from '../../components/ui/TitleWithDividers'
import CourseUpdate from '../../components/courses/CourseUpdate'
import Separator from '../../components/ui/Separator'
import AdminCourseDetails from '../../components/courses/AdminCourseDetails'

import { lang } from '../../settings/constants/arlang'
import ModalStyled from '../../style/mui/styled/ModalStyled'
import UnitCreate from '../../components/courses/UnitCreate'
import CourseCreate from '../../components/courses/CourseCreate'
import ManageUnits from './ManageUnits'
import ManageCourses from './ManageCourses'


// const UnitCreate = lazy(() => import('../../components/courses/UnitCreate'))

function ManageCoursesPage() {

    //modals params

    const [grade, setGrade] = useState(null)
    const [activeUnit, setActiveUnit] = useState(null) // unit_id
    const [activeCourse, setActiveCourse] = useState(null)
    const [counts, setCounts] = useState({})

    //lectures numbers in every grade
    const [getCoursesCountFc] = useLazyGetCoursesCountQuery()
    const [getCoursesCount] = useLazyGetData(getCoursesCountFc)

    useEffect(() => {
        const trigger = async () => {
            const allGrades = await getCoursesCount()
            const grade1 = await getCoursesCount({ grade: 1 }, false)
            const grade2 = await getCoursesCount({ grade: 2 }, false)
            const grade3 = await getCoursesCount({ grade: 3 }, false)
            setCounts({ allGrades, grade1, grade2, grade3 })
        }
        trigger()
    }, [])


    return (
        <Section>
            <Paper sx={{ p: '40px' }}>

                <GradesTabs setGrade={setGrade} counts={counts} />
                <FlexColumn>
                    {/* <BannerIcon title="manage Courses" icon="icon " /> */}

                    <ManageUnits grade={grade} activeUnit={activeUnit} setActiveUnit={setActiveUnit} />


                    {(activeUnit) && (
                        <ManageCourses grade={grade} activeUnit={activeUnit} activeCourse={activeCourse} setActiveCourse={setActiveCourse} />
                    )}

                    {(activeCourse && activeUnit) && (
                        <Box sx={{ width: '100%' }}>
                            <AdminCourseDetails courseId={activeCourse} />
                        </Box>
                    )}


                    <Separator sx={{ width: '100%' }} />


                    {(activeCourse && activeUnit) && (
                        <Box sx={{ width: '100%' }}>
                            <AdminLectures course={activeCourse} unit={activeUnit} grade={grade} />
                        </Box>
                    )}

                </FlexColumn>
            </Paper>
        </Section>
    )
}

//banner
//units
//courses
//lectures
export default ManageCoursesPage
