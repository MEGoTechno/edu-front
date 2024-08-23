import React, { memo, useEffect, useState } from 'react'
import CardStyled from '../../style/mui/styled/CardStyled'
import Grid from '../../style/vanilla/Grid'
import TitleSection from '../ui/TitleSection'
import { Alert, Box, Divider, Typography } from '@mui/material'
import TitleWithDividers from '../ui/TitleWithDividers'

import { useLazyGetLecturesQuery } from '../../toolkit/apis/lecturesApi'
import useLazyGetData from "../../hooks/useLazyGetData"
import AdminCardLecture from '../ui/AdminCardLecture'
import { FlexColumn } from '../../style/mui/styled/Flexbox'
import Separator from '../ui/Separator'
import LoaderWithText from '../../style/mui/loaders/LoaderWithText'
import { lang } from '../../settings/constants/arlang'
import { OutLinedHoverBtn } from '../../style/mui/btns/buttonsStyles'
import ModalStyled from '../../style/mui/styled/ModalStyled'
import CourseCreate from './CourseCreate'
import LectureCreate from './LectureCreate'

function AdminLectures({ course, unit, grade }) {

  const [open, setOpen] = useState(false)
  const [lectures, setLectures] = useState([])

  const [getData, status] = useLazyGetLecturesQuery()
  const [getLectures] = useLazyGetData(getData)

  useEffect(() => {
    const trigger = async () => {
      const res = await getLectures({ course }, false)
      setLectures(res.lectures)
    }
    trigger()
  }, [course])

  const addLecture = (lecture => setLectures([...lectures, lecture]))

  if (status.isLoading) return <LoaderWithText />

  if (status.isSuccess && lectures.length === 0) return <Box>
    <Alert variant="filled" severity="warning" sx={{ justifyContent: 'center', my: '16px' }}>
      {lang.NO_LECTURES_IN_THIS_COURSE}
    </Alert>

    <OutLinedHoverBtn sx={{ m: '0 auto', width: '100%' }} onClick={() => setOpen(true)}>{lang.ADD_LECTURE}</OutLinedHoverBtn>
    <ModalStyled open={open} setOpen={setOpen} >
      <LectureCreate unit={unit} grade={grade} course={course} addLecture={addLecture} />
    </ModalStyled>

  </Box>

  return (
    <div>
      <TitleWithDividers title={'lectures'} />
      <FlexColumn gap={'10px'} width={'100%'} >
        {lectures?.map((lecture, i) => {
          return <>
            <AdminCardLecture key={i} lecture={lecture} />
            <Separator />
          </>
        })}

      </FlexColumn>

      <OutLinedHoverBtn sx={{ m: '0 auto', width: '100%' }} onClick={() => setOpen(true)} >add lecture</OutLinedHoverBtn>
      <ModalStyled open={open} setOpen={setOpen} >
        <LectureCreate unit={unit} grade={grade} course={course} addLecture={addLecture} />
      </ModalStyled>
    </div>
  )
}

// lecture => vids, files, exams
export default memo(AdminLectures)
