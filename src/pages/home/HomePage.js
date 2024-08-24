import { Box, Divider, Typography, useTheme } from '@mui/material'

import { motion } from 'framer-motion'
import Hero from '../../components/hero/Hero'
import TitleSection from '../../components/ui/TitleSection'
import Services from '../../components/services/Services'
import Section from '../../style/mui/styled/Section'
import Grades from '../../components/grades/Grades'
import { useSelector } from 'react-redux'

import UserHome from './UserHome'
import { FlexColumn } from '../../style/mui/styled/Flexbox'
import { LogosYoutubeIcon } from '../../components/ui/svg/Social'
import { lang } from '../../settings/constants/arlang'

const BoxFm = motion(Box)
const paddingX = {
  xs: '-10px',
  sm: '-30px',
  md: '-82px',
  lg: '-82px',
}

const SERVICES_HEADER1 = 'كيفية تحقيق اقصى'
const ServicesHeader2 = 'استفاده من'
const ServicesHeader3 = 'منصتنا'

function HomePage({ px }) {

  const { user } = useSelector(s => s.global)

  const theme = useTheme()
  if (user) return <UserHome />

  return (
    <Box sx={{
      width: '100%',
    }}>
      <Section>
        <Box color={'neutral.0'}>
          <Hero />
        </Box>
      </Section>

      <Box sx={{
        bgcolor: 'orange', minHeight: '80vh', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}>
        <Section>

          <FlexColumn >

            <Typography variant='h5' sx={{ bgcolor: 'grey.0', color: 'grey.1000', textAlign: 'center', width: 'fit-content', m: '14px auto', p: ' 8px 16px', borderRadius: '16px' }}>
              {SERVICES_HEADER1}
              <span style={{ color: 'blue' }}> {ServicesHeader2}</span>
              <span style={{ color: 'red' }}> {ServicesHeader3}</span>
            </Typography>

            <Box sx={{
              width: '100%', maxWidth: '800px', bgcolor: '#ddd', borderRadius: '16px', aspectRatio: '2/1', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: theme.shadows[8]
            }}>
              <LogosYoutubeIcon size={'3rem'} />
            </Box>
          </FlexColumn>
        </Section>
      </Box>

      {/*  services */}
      <Section>
        <TitleSection title={'نجاحك مهمتنا'} />
      </Section>

      <Box sx={{ bgcolor: 'transparent' }}>
        <Section>
          <Services />
        </Section>
      </Box>

      {/*  grades */}
      <Section>
        <TitleSection title={lang.GRADES} />
      </Section>

      <Section>
        <Grades />
      </Section>

    </Box >
  )
}

// hero about  grades services latest news
export default HomePage
