import { Box, Divider, Typography } from '@mui/material'

import { motion } from 'framer-motion'
import Hero from '../../components/hero/Hero'
import SectionTitle from '../../components/section_title/SectionTitle'
import Services from '../../components/services/Services'
import Section from '../../style/mui/styled/Section'
import Grades from '../../components/grades/Grades'
import { useSelector } from 'react-redux'

import UserHome from './UserHome'

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
        bgcolor: 'orange', minHeight: '100vh'
      }}>
        <Section>

          <Typography variant='body1' sx={{ bgcolor: 'grey.0', color: 'grey.1000', textAlign: 'center', width: 'fit-content', m: '0 auto', px: '16px' }}>
            {SERVICES_HEADER1}
            <span style={{ color: 'blue' }}> {ServicesHeader2}</span>
            <span style={{ color: 'red' }}> {ServicesHeader3}</span>
          </Typography>

        </Section>
      </Box>

      {/*  services */}
      <Section>
        <SectionTitle title={'نجاحك مهمتنا'} />
      </Section>

      <Box sx={{ bgcolor: 'transparent' }}>
        <Section>
          <Services />
        </Section>
      </Box>

      {/*  grades */}
      <Section>
        <SectionTitle title={'grades'} />
      </Section>

      <Section>
        <Grades />
      </Section>

    </Box>
  )
}

// hero about  grades services latest news
export default HomePage
