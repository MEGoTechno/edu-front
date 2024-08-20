import { Box, Divider, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useRef } from 'react'
import { FlexBetween, FlexColumn, FlexRow } from '../../style/mui/styled/Flexbox'
import { OutLinedHoverBtn, StyledBtn } from '../../style/mui/btns/buttonsStyles'
import HeroContent from './HeroContent'
import Banner from './Banner'
import Ballons from '../../pages/test/ballons/Ballons'
import { motion, useMotionValue, useScroll, useTransform } from 'framer-motion'
import DnaAnimation from '../animations/dna/DnaAnimation'
import "./bubbles.css"
import { FaVirusCovid } from "react-icons/fa6";

const FlexRowFm = motion(FlexRow)
const FlexColumnFm = motion(FlexColumn)
const BoxFm = motion(Box)


const coronaVar = {
    hidden: {
        x: -20, y: -20
    },
    visible: {
        x: [0, -100, -100, -300, -300, -200, -200, -100, 0],
        y: [0, 25, 35, 50, 80, 162, 180, 120, 90, 40, 0],
        rotate: ['45deg', '-45deg', '135deg', '-135deg', '45deg', '-45deg', '90deg', '-90deg', "0deg"],
        transition: {
            duration: 30, type: "infinity",
            repeat: Infinity
        }
    }
}

const leftCoronaVar = {
    hidden: {
        x: -20, y: -20
    },
    visible: {
        x: [0, -100, -100, -300, -300, -200, -200, -100, 0],
        y: [0, -25, -35, -50, 80, - 162, - 180, - 120, - 90, -40, 0],
        rotate: ['45deg', '-45deg', '135deg', '-135deg', '45deg', '-45deg', '90deg', '-90deg', "0deg"],
        transition: {
            duration: 30, type: "infinity",
            repeat: Infinity
        }
    }
}

function Hero() {
    const theme = useTheme()

    // const x = useMotionValue(0)
    const heroRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start center", "center center"]
    })
    const xBanner = useTransform(scrollYProgress, [.5, 1], ["-25%", "-50%"])

    const xContent = useTransform(scrollYProgress, [.5, 1], ["25%", "50%"])

    const opacity = useTransform(scrollYProgress, [.5, 1], ["1", "0"])

    const isNonMobileScreen = useMediaQuery('(min-width:900px)');


    return (
        <Box sx={{ minHeight: isNonMobileScreen ? '150vh' : '86vh', position: 'relative' }} ref={heroRef} >

            {isNonMobileScreen ? (
                <>
                    <FlexColumnFm style={{ x: xContent }} sx={{
                        maxWidth: '450px', m: 'auto', position: 'sticky', top: '90px'
                    }}>
                        <HeroContent />
                    </FlexColumnFm>

                    <BoxFm style={{ x: xBanner }} sx={{
                        minWidth: '240px', maxWidth: { xs: '300px', md: '400px', lg: '500px' },
                        m: '0 auto', pointerEvents: 'none', position: 'sticky', top: "90px"

                    }}>
                        <Banner />

                    </BoxFm>

                    <BoxFm style={{ opacity }} sx={{
                        position: 'absolute', top: '60px', minWidth: '250px', minHeight: '250px', right: '40px', transform: 'rotate(30deg)',
                        borderRadius: '50%', zIndex: -2,
                    }}>
                        <DnaAnimation circleColor={theme.palette.primary.main} borderColor={'orange'} />

                    </BoxFm>
                </>
            ) : (

                <>
                    <FlexColumnFm sx={{
                        maxWidth: '450px', m: 'auto'
                    }}>
                        <HeroContent />
                    </FlexColumnFm>

                    <BoxFm sx={{
                        minWidth: '240px', maxWidth: { xs: '300px', md: '400px', lg: '500px' },
                        m: '0 auto', pointerEvents: 'none',
                    }}>
                        <Banner />
                    </BoxFm>
                </>
            )}

            <BoxFm variants={coronaVar} initial="hidden" animate="visible" style={{
                position: 'absolute', right: '0', top: '0', zIndex: -2, opacity: '.4'
            }} >
                <FaVirusCovid color='orange' style={{
                    width: '70px', height: '70px'
                }} />
            </BoxFm>

            <BoxFm variants={leftCoronaVar} initial="hidden" animate="visible" style={{
                position: 'absolute', right: '100px', bottom: '150px', zIndex: -2, opacity: '.4'
            }} >
                <FaVirusCovid color='orange' style={{
                    width: '70px', height: '70px'
                }} />
            </BoxFm>
            {/* 
            <Box sx={{
                position: 'absolute', top: '0'
            }}>
                <div className='bubbles'></div>
            </Box> */}
            {/* <FaVirusCovid color='orange' style={{
                position: 'absolute', right: '0', bottom: '0', width: '70px', height: '70px'
            }} />

            <FaVirusCovid color='orange' style={{
                position: 'absolute', left: '0', top: '0', width: '70px', height: '70px'
            }} /> */}


            {/* <Ballons /> */}
        </Box>
    )
}

export default Hero
