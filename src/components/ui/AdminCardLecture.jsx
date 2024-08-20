import React from 'react'
import CardStyled from '../../style/mui/styled/CardStyled'
import { Box, Button } from '@mui/material'
import { FlexColumn, FlexRow } from '../../style/mui/styled/Flexbox'
import Image from './Image'
import LectureUpdate from '../courses/LectureUpdate'
import { FilledHoverBtn } from '../../style/mui/btns/buttonsStyles'

function AdminCardLecture({ lecture }) {
  return (
    <FlexRow gap={'30px'} sx={{ alignItems: 'flex-start' }} width={'100%'} >
      <FlexColumn>
        <Image img={'/assets/3rd.jpg'} sx={{  height: '100%' }} />
        <FilledHoverBtn>statistics</FilledHoverBtn>
      </FlexColumn>

      <Box maxWidth={'500px'}>
        <LectureUpdate lecture={lecture} />
      </Box>
    </FlexRow>
  )
}

export default AdminCardLecture
