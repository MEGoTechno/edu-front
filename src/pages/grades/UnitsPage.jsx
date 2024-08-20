import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Section from '../../style/mui/styled/Section'
import { Avatar, Box, Button, Chip, Divider, Typography, useTheme } from '@mui/material'
import { FlexBetween, FlexColumn, FlexRow } from '../../style/mui/styled/Flexbox'
import CardInfo from '../../style/mui/components/CardInfo'
import gradeConstants from '../../settings/constants/gradeConstants'
import AccordionStyled from '../../style/mui/styled/AccordionStyled'
import SectionTitle from '../../components/section_title/SectionTitle'
import HeaderContent from '../../components/ui/HeaderContent'
import { RtArrow } from '../../components/header/Icons'
import { Link, useParams } from 'react-router-dom'
import { CoursesIcon, UnitsIcon, VidsIcon2 } from '../../components/ui/svg/ContentSvgs'
import { useLazyGetCoursesCountQuery, useLazyGetLecturesCountQuery, useLazyGetUnitsCountQuery } from '../../toolkit/apis/statisticsApi'
import useLazyGetData from '../../hooks/useLazyGetData'

import { lang } from '../../settings/constants/arlang'
import { filterArrWithValue } from '../../tools/fcs/MakeArray'
import GradeHeader from '../../components/grades/GradeHeader'
import { useLazyGetUnitsQuery } from '../../toolkit/apis/unitsApi'
import LoaderSkeleton from '../../style/mui/loaders/LoaderSkeleton'
import { useLazyGetCoursesQuery } from '../../toolkit/apis/coursesApi'

import Separator from "../../components/ui/Separator"
import UnitCourses from '../../components/grades/UnitCourses'


function UnitsPage() {

  const theme = useTheme()

  const { gradeId } = useParams()


  const [units, setUnits] = useState([])
  const [courses, setCourses] = useState({})

  // units
  const [getUnitsFc, status] = useLazyGetUnitsQuery()
  const [getUnits] = useLazyGetData(getUnitsFc)

  useEffect(() => {
    const trigger = async () => {
      const res = await getUnits({ grade: gradeId })
      setUnits(res.units)
    }

    trigger()
  }, [])

  console.log('object us', units)
  return (
    <Section>

      <GradeHeader gradeId={gradeId} />

      <Box minHeight={'100vh'} sx={{ padding: '8px' }}>
        <SectionTitle title={lang.GRADE_CONTENT} />


        {status.isLoading ? <LoaderSkeleton /> :
          <>
            {units?.map((unit, i) => <UnitCourses key={i} unit={unit} />)}
          </>

        }
      </Box>
    </Section >
  )
}


export default UnitsPage
