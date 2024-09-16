import { Box, Divider, IconButton, Typography, useTheme } from '@mui/material'
import React from 'react'
import { FlexRow } from '../../style/mui/styled/Flexbox'
import { StyledBtn } from '../../style/mui/btns/buttonsStyles'

import { FaFacebook } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaXTwitter } from "react-icons/fa6";
import { FaTelegram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { LogosFacebook, LogosTelegram, LogosYoutubeIcon, SkillIconsInstagram } from '../ui/svg/Social';
import { Link } from 'react-router-dom';

const LOGO_DR = 'أ/'
const LOGO_FIRST_NAME = 'إبراهيم'
const LOGO_SECOND_NAME = 'علام'


function HeroContent() {
    const theme = useTheme()
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
                <StyledBtn sx={{ m: '0 5px', fontSize: { md: '1.7rem', xs: '1rem' }, minWidth: '250px' }} component={Link} to="/grades">عرض الكورسات</StyledBtn>
            </FlexRow>

            <FlexRow gap={'10px'}>
                <IconButton color='neutral.0'><LogosFacebook /></IconButton>
                <IconButton><SkillIconsInstagram size="1.5rem" /></IconButton>
                <IconButton><FaXTwitter size={'1.5rem'} color={theme.palette.neutral[0]} /></IconButton>
                <IconButton><LogosTelegram /></IconButton>
                <IconButton><LogosYoutubeIcon /></IconButton>
            </FlexRow>
        </>
    )
}
//color='#E1306C'
export default HeroContent
