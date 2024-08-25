import React from 'react'
import Grades from '../../components/grades/Grades'
import TitleSection from '../../components/ui/TitleSection'
import { lang } from '../../settings/constants/arlang'
import Section from '../../style/mui/styled/Section'

function GradesPage() {
  return (
    <Section>
      <TitleSection title={lang.COURSES} />
      <Grades />
    </Section>
  )
}

export default GradesPage
