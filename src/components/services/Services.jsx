import { Box, Paper, Typography, useTheme } from '@mui/material'
import React from 'react'

import Grid from '../../style/vanilla/Grid'
import { CovidVirusLabResearchMagnifier1, HeadServicesIcon, LecturesIcon } from './ServicesIcons'
import CardService from '../ui/CardService'


const LECTURE_DESC = 'وفر وقتك وابدا شوف افضل المحاضرات الاونلاين'
const NEW_SYSTEM_ONLINE = "شروحات و كتب لمواكبة النظام الجدبد بافضل الطرق و الادوات"
const NEW_QUESTIONS = 'حل اسئله جديده و متنوعه'

function Services() {

  const theme = useTheme()

  return (
    <Box>

      <Grid>
        <CardService icon={<LecturesIcon size='4rem' />} dir='hori' desc={LECTURE_DESC} color={theme.palette.primary.main} />

        <CardService icon={<HeadServicesIcon size='4rem' />} dir='vert' desc={NEW_SYSTEM_ONLINE} color={'orange'} />

        <CardService icon={<CovidVirusLabResearchMagnifier1 size='4rem' />} dir='hori' desc={NEW_QUESTIONS} color={'red'} />

      </Grid>
    </Box>
  )
}

// card
export default Services
