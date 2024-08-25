import React, { useState } from 'react'
import { FlexBetween } from '../../style/mui/styled/Flexbox'
import { StyledBtn } from '../../style/mui/btns/buttonsStyles'
import SelectCourse from '../../components/courses/SelectCourse'
import { lang } from '../../settings/constants/arlang'
import ModalStyled from '../../style/mui/styled/ModalStyled'
import CourseCreate from '../../components/courses/CourseCreate'
import { Alert } from '@mui/material'

function ManageCourses({ grade, activeUnit, activeCourse, setActiveCourse }) {

    const [openCourseModal, setCourseModal] = useState(false)
    const [courses, setCourses] = useState([])

    return (
        <>
            <FlexBetween gap={'10px'} m={'20px 0'} >
                <StyledBtn disabled={!activeUnit} onClick={() => setCourseModal(true)}> {lang.CREATE_COURSE}</StyledBtn>
                <SelectCourse unit={activeUnit} setValue={setActiveCourse} value={activeCourse} reset={[activeUnit]} courses={courses} setCourses={setCourses} />
            </FlexBetween>

            <ModalStyled open={openCourseModal} setOpen={setCourseModal} >
                {(activeUnit && grade) ?
                    <CourseCreate grade={grade} unit={activeUnit} setCourses={setCourses} />
                    : <Alert severity='warning'>من فضلك اختر وحده !</Alert>
                }
            </ModalStyled>
        </>
    )
}

export default ManageCourses
