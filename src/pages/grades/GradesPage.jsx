import React from 'react'
import Grades from '../../components/grades/Grades'
import TitleSection from '../../components/ui/TitleSection'
import { lang } from '../../settings/constants/arlang'

function GradesPage() {
  return (
    <div>
      <TitleSection title={lang.COURSES} />
      <Grades />
    </div>
  )
}

export default GradesPage
