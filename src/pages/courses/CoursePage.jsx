import React, { useEffect, useState } from 'react'
import HeaderContent from '../../components/ui/HeaderContent'
import Section from '../../style/mui/styled/Section'
import { ExamIcon, ExamIconOutlined, FilesIcon, FilesIcon2, FilesIconWithLamp, VidsIcon2 } from '../../components/ui/svg/ContentSvgs'
import { Alert, Box, Link } from '@mui/material'
import CardCourse from '../../components/ui/CardCourse'
import RowInfo from '../../components/ui/RowInfo'
import { FilledHoverBtn } from '../../style/mui/btns/buttonsStyles'
import { AiFillPoundCircle } from 'react-icons/ai'
import TitleSection from '../../components/ui/TitleSection'
import AccordionStyled from '../../style/mui/styled/AccordionStyled'
import CardHover from '../../components/ui/CardHover'
import Grid from '../../style/vanilla/Grid'
import { useLazyGetCoursesQuery } from '../../toolkit/apis/coursesApi'
import useLazyGetData from '../../hooks/useLazyGetData'
import { useLocation, useParams } from 'react-router-dom'
import { useLazyGetLecturesCountQuery } from '../../toolkit/apis/statisticsApi'
import TabInfo from '../../components/ui/TabInfo'
import { FlexColumn, FlexRow } from '../../style/mui/styled/Flexbox'
import { useLazyGetLecturesQuery } from '../../toolkit/apis/lecturesApi'
import Loader from '../../style/mui/loaders/Loader'
import CourseSubscribeCard from '../../components/courses/CourseSubscribeCard'
import LoaderSkeleton from '../../style/mui/loaders/LoaderSkeleton'
import LoaderWithText from '../../style/mui/loaders/LoaderWithText'

function CoursePage() {

  const [expand, setExpand] = useState(false)
  const [course, setCourse] = useState(null)

  const params = useParams()
  const location = useLocation()

  useEffect(() => {
    if (location.state) setCourse(location.state)
  }, [location])



  const [getData] = useLazyGetCoursesQuery()
  const [getCourse] = useLazyGetData(getData)

  useEffect(() => {
    const trigger = async () => {
      const res = await getCourse({ index: params.courseId })
      setCourse(res.courses[0])
    }
    if (!location.state) {
      trigger()
    }
  }, [course, location])



  const [counts, setCounts] = useState({ lectures: 0, files: 0, exams: 0 })
  const [getLecturesStat] = useLazyGetLecturesCountQuery()
  const [getLecturesCount] = useLazyGetData(getLecturesStat)

  useEffect(() => {

    const trigger = async () => {
      const res = await getLecturesCount({ course: course._id })
      setCounts({ ...counts, lectures: res.count })
    }

    if (course) {
      trigger()
    }

  }, [course, location])


  const [lectures, setLectures] = useState([])
  const [getLecturesFc, status] = useLazyGetLecturesQuery()
  const [getLectures] = useLazyGetData(getLecturesFc)

  useEffect(() => {
    const trigger = async () => {
      const res = await getLectures({ course: course?._id })
      setLectures([...res.lectures])
    }
    if (expand && lectures.length === 0) {
      trigger()
    }

  }, [course, expand])

  //is Subscribed


  if (!course) return <LoaderSkeleton />

  return (
    <Section>
      <HeaderContent title={course.name} body={<span dangerouslySetInnerHTML={{ __html: course.description }} />}
        infos={[
          {
            caption: 'lectures', desc: '+ ' + counts.lectures, icon: <VidsIcon2 size='1.5rem' />
          }, {
            caption: 'Files', desc: '+ 0', icon: <FilesIcon size='1.5rem' />
          }, {
            caption: 'Exams', desc: '+ 0', icon: <ExamIcon size='1.5rem' />
          }
        ]}
      >
        {course ?
          <CourseSubscribeCard course={course} />
          : <Loader />}
      </HeaderContent>

      <TitleSection title={'course content'} />

      <Box >
        <AccordionStyled title={'lectures'} setExpanded={setExpand} expanded={expand}>
          {status.isLoading && (
            <LoaderWithText />
          )}

          <Grid>

            {lectures?.length === 0 ? <Alert variant='filled' severity='warning'>عذرًا، سيتم إضافة المحاضرات قريبا...!</Alert> : lectures.map((lecture, i) => {
              return <CardHover key={i} img={lecture?.thumbnail?.url || '/assets/3rd.jpg'} title={lecture?.name} desc={<span dangerouslySetInnerHTML={{ __html: lecture.description }} />} to={'lectures/' + lecture._id} >
                <FlexColumn>
                  <TabInfo title={'duration'} count={'03:00:00'} icon={<AiFillPoundCircle size={'1.5rem'} />} i={0} sx={{ mr: 'auto' }} />
                  <TabInfo title={'duration'} count={'03:00:00'} icon={<AiFillPoundCircle size={'1.5rem'} />} i={0} sx={{ mr: 'auto' }} />
                  <TabInfo title={'duration'} count={'03:00:00'} icon={<AiFillPoundCircle size={'1.5rem'} />} i={0} sx={{ mr: 'auto' }} />
                </FlexColumn>
              </CardHover>
            })}

          </Grid>
        </AccordionStyled>
      </Box>

    </Section>
  )
}

// header
// subscribe card
// content
export default CoursePage
