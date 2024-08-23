import { Alert, Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, Divider, IconButton, Typography, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Section from '../../style/mui/styled/Section'
import { FlexBetween, FlexColumn, FlexRow } from '../../style/mui/styled/Flexbox'
import CardExam from '../../components/ui/CardExam'
import RowInfo from '../../components/ui/RowInfo'
import { useLocation, useParams } from 'react-router-dom'
import { useGetSecureVideoMutation, useLazyGetLecturesQuery, useLazyGetOneLectureQuery } from '../../toolkit/apis/lecturesApi'
import useLazyGetData from '../../hooks/useLazyGetData'
import usePostData from '../../hooks/usePostData'
import VideoPlayer from '../../components/ui/VideoPlayer'
import TitleWithDividers from '../../components/ui/TitleWithDividers'
import Separator from '../../components/ui/Separator'
import TabInfo from '../../components/ui/TabInfo'

import { IoMdTime } from "react-icons/io";

import { FcQuestions } from "react-icons/fc";

import { GoArrowRight } from "react-icons/go";
import TitleSection from '../../components/ui/TitleSection'

function LecturePage() {
    const theme = useTheme()

    const [lecture, setLecture] = useState(null)
    const params = useParams()
    const location = useLocation()

    useEffect(() => {
        if (location.state) setLecture(location.state)
    }, [location])

    const [getData, status] = useLazyGetOneLectureQuery()
    const [getLecture] = useLazyGetData(getData)

    useEffect(() => {
        const trigger = async () => {
            const res = await getLecture({ lecture: params.lectureId })
            setLecture(res)
        }
        if (!lecture) {
            trigger()
        }

    }, [params.lectureId])


    const [video, setVideo] = useState(null)
    const [getSecureVideo] = useGetSecureVideoMutation()
    const [getVideo] = usePostData(getSecureVideo)
    useEffect(() => {
        const trigger = async () => {
            const res = await getVideo({ lecture: lecture._id, course: lecture.course })
            setVideo(res)
        }
        if (lecture) {
            trigger()
        }
    }, [lecture])

    const [otherLectures, setOthers] = useState([])
    const [getDataLectures] = useLazyGetLecturesQuery()
    const [getOtherLectures] = useLazyGetData(getDataLectures)

    useEffect(() => {
        const trigger = async () => {
            const res = await getOtherLectures({ course: lecture.course, _id: `!${lecture._id}` })
            setOthers(res.lectures)
        }
        if (lecture) {

            trigger()
        }
    }, [lecture])

    if (!lecture) return <>loading ...</>

    return (
        <Section>
            <FlexBetween sx={{ alignItems: 'flex-start', color: 'neutral.0' }}>

                <FlexColumn sx={{ width: '100%',  maxWidth: '700px', m: '0 auto' }}>
                    {/* video */}
                    <FlexColumn sx={{ width: '100%', minHeight: '86vh' }}>
                        {/* video TV */}
                        <VideoPlayer v={video} />

                        {/* video description */}
                        <FlexColumn sx={{ p: '16px 8px', alignItems: 'flex-start', m: '0 auto', width: '100%' }}>
                            <Typography variant='h6'>{lecture.name}</Typography>
                            <Typography variant='subtitle2' mt={'14px'}>{lecture.description}</Typography>
                            <Divider sx={{ borderColor: 'primary.main', borderWidth: '4px', width: '100%', my: '16px', borderRadius: '16px' }} />
                        </FlexColumn>
                    </FlexColumn>

                    {/* files */}
                    <Box width={"100%"}>
                        {/* <TitleWithDividers title={'files'} /> */}
                        <TitleSection title={'Files'} />
                        <Alert variant='filled' severity='warning' sx={{maxWidth: '350px', m: '0 auto'}}>No Files</Alert>
                    </Box>

                    <Separator />

                    {/* Exams */}
                    <Box width={"100%"}>
                        <TitleSection title={'Exams'} />

                        <Card sx={{ minWidth: 275, maxWidth: 300, m: "auto" }}>
                            <CardContent>
                                <Divider sx={{ borderColor: 'primary.main', borderWidth: '2px', width: '60px', my: '16px', borderRadius: '16px' }} />
                                <Typography variant='h6' gutterBottom>
                                    Exam Name
                                </Typography>
                                <Divider sx={{ borderColor: 'primary.main', borderWidth: '4px', width: '100%', my: '16px', borderRadius: '16px' }} />

                                <FlexColumn sx={{ alignItems: 'flex-start' }} gap={2}>
                                    <TabInfo count={'30m'} i={1} title={'Time'} icon={<IoMdTime size={'1.5rem'} />} />
                                    <TabInfo count={'30m'} i={1} title={'questions'} icon={<FcQuestions size={'1.5rem'} />} />
                                    <TabInfo count={'2 attempt'} i={1} title={'attempts'} icon={<FcQuestions size={'1.5rem'} />} />
                                    {/* <TabInfo count={'2 attempt'} i={1} title={'attempts'} icon={<FcQuestions size={'1.5rem'} />} /> */}
                                </FlexColumn>


                            </CardContent>
                            <CardActions>
                                <Button size="small" sx={{ width: '100%' }} startIcon={<GoArrowRight size={'1.5rem'} />}>start </Button>
                            </CardActions>
                        </Card>

                    </Box>
                </FlexColumn>

                <Box sx={{ maxWidth: 320 }}>
                    <TitleWithDividers title={'Other Lecture in Course'} />
                    <FlexColumn gap={1}>
                        {otherLectures.map((lecture, i) => {
                            return (
                                <Button
                                    key={i}
                                >
                                    <CardHeader
                                        sx={{
                                            borderRadius: '14px', bgcolor: theme.palette.primary.main + 20
                                        }}
                                        avatar={
                                            <Avatar sx={{ bgcolor: 'red', width: 56, height: 56  }} aria-label="recipe" src={lecture.thumbnail.url} variant='square' >
                                                M
                                            </Avatar>
                                        }
                                        action={
                                            <IconButton aria-label="settings">
                                                <GoArrowRight size={'1.5rem'} />
                                            </IconButton>
                                        }
                                        title={lecture.name}
                                        subheader={lecture.description}
                                    />
                                </Button>
                            )
                        })}

                    </FlexColumn>

                </Box>

            </FlexBetween>

        </Section >
    )
}

export default LecturePage
