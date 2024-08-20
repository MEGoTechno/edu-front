import { Box, Divider, Typography } from '@mui/material'
import React from 'react'
import { FlexRow } from '../../style/mui/styled/Flexbox'
import { StyledBtn } from '../../style/mui/btns/buttonsStyles'

const LOGO_DR = 'أ/'
const LOGO_FIRST_NAME = 'محمود'
const LOGO_SECOND_NAME = 'العوضى'


function HeroContent() {
    return (
        <>
            <Typography variant='banner' noWrap mb="30px">
                <span style={{ color: '' }}>{LOGO_DR}</span>
                <span>{LOGO_FIRST_NAME} </span>
                <span style={{ color: 'orange' }}>{LOGO_SECOND_NAME}</span>
            </Typography>
            <Typography variant='h6' noWrap >مدرس علم الاحياء</Typography>
            <Divider sx={{
                borderColor: 'primary.main',
                borderWidth: '2px', width: '160px',
                borderRadius: '16px', my: '8px'
            }} />

            <Typography variant='subtitle1'  >مرحبا دفعة <span style={{ color: 'orange' }}>2025</span> </Typography>
            <Typography variant='subBanner' noWrap={false} my={'14px'}  >خيارك الافضل لتعلم <span style={{ color: 'red' }}>الاحياء</span> <span style={{ color: 'orange' }}>للمرحله الثانويه</span> </Typography>

            <FlexRow sx={{ my: '16px' }}>
                <StyledBtn sx={{ m: '0 5px', fontSize: { md: '1.7rem', xs: '1rem' }, minWidth: '250px' }}>عرض الكورسات</StyledBtn>
            </FlexRow>
            <FlexRow gap={'10px'}>
                <Box sx={{ width: '40px', height: '40px', bgcolor: '#ddd', borderRadius: '16px' }}></Box>
                <Box sx={{ width: '40px', height: '40px', bgcolor: '#ddd', borderRadius: '16px' }}></Box>
                <Box sx={{ width: '40px', height: '40px', bgcolor: '#ddd', borderRadius: '16px' }}></Box>
                <Box sx={{ width: '40px', height: '40px', bgcolor: '#ddd', borderRadius: '16px' }}></Box>
            </FlexRow>
        </>
    )
}

export default HeroContent
