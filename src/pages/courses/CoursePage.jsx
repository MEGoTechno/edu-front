import React, { useState } from 'react'
import HeaderContent from '../../components/ui/HeaderContent'
import Section from '../../style/mui/styled/Section'
import { ExamIcon, ExamIconOutlined, FilesIcon, FilesIcon2, FilesIconWithLamp, VidsIcon2 } from '../../components/ui/svg/ContentSvgs'
import { Box } from '@mui/material'
import CardCourse from '../../components/ui/CardCourse'
import RowInfo from '../../components/ui/RowInfo'
import { FilledHoverBtn } from '../../style/mui/btns/buttonsStyles'
import { AiFillPoundCircle } from 'react-icons/ai'
import SectionTitle from '../../components/section_title/SectionTitle'
import AccordionStyled from '../../style/mui/styled/AccordionStyled'
import CardHover from '../../components/ui/CardHover'
import Grid from '../../style/vanilla/Grid'

function CoursePage() {

  const [expand, setExpand] = useState(false)
  return (
    <Section>
      <HeaderContent title={'Course NAme is here'} body={'course body is here'}
        infos={[
          {
            caption: 'lectures', desc: '+ 4', icon: <VidsIcon2 size='1.5rem' />
          }, {
            caption: 'Files', desc: '+ 4', icon: <FilesIcon size='1.5rem' />
          }, {
            caption: 'Exams', desc: '+ 4', icon: <ExamIcon size='1.5rem' />
          }
        ]}
      >
        <CardCourse img={'/assets/1st.jpg'} title={'some name'} desc="سعر الكورس: 20 نحنوحا" borderColor="transparent">
          <RowInfo title={'سعر الكورس'} desc="20 حنيها" icon={<AiFillPoundCircle />} />
          <RowInfo title={"course start"} desc="20 حنيها" icon={<AiFillPoundCircle />} />

          <FilledHoverBtn sx={{ mt: '16px', width: '100%' }} >subscribe now</FilledHoverBtn></CardCourse>
      </HeaderContent>

      <SectionTitle title={'course content'} />

      <Box >
        <AccordionStyled title={'lectures'} setExpanded={setExpand} expanded={expand}>
          <Grid>
            <CardHover img={'/assets/2nd.jpg'} title={'lecture 1'} desc={'some infooos'} to={'lectures/1'} />
            <CardHover img={'/assets/2nd.jpg'} title={'lecture 1'} desc={'some infooos'} />
            <CardHover img={'/assets/2nd.jpg'} title={'lecture 1'} desc={'some infooos'} />
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
