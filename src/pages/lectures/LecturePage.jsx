import { Box, Button, Card, CardActions, CardContent, Divider, Typography, useTheme } from '@mui/material'
import React from 'react'
import Section from '../../style/mui/styled/Section'
import { FlexBetween, FlexColumn, FlexRow } from '../../style/mui/styled/Flexbox'
import CardExam from '../../components/ui/CardExam'
import RowInfo from '../../components/ui/RowInfo'

function LecturePage() {
    const theme = useTheme()

    return (
        <Section>
            <FlexColumn sx={{ width: '100%', minHeight: '86vh' }}>
                {/* video */}
                <FlexColumn sx={{ width: '100%', minHeight: '86vh', maxWidth: '800px' }}>
                    {/* video TV */}
                    <FlexColumn sx={{
                        bgcolor: 'red', m: '0 auto', flexGrow: 1, width: '100%'
                    }}>
                        <Box sx={{
                            clipPath: 'polygon(100% 50%, 0 0, 0 100%)', width: '100px', height: '100px', bgcolor: '#ddd', m: 'auto'
                        }}>
                        </Box>
                    </FlexColumn>
                    {/* video description */}
                    <FlexColumn sx={{ p: '16px 8px', alignItems: 'flex-start', m: '0 auto', width: '100%' }}>
                        <Typography variant='h5'>Video Name</Typography>
                        <Typography variant='body1'>Desc</Typography>
                        <Divider sx={{ borderColor: 'primary.main', borderWidth: '4px', width: '100%', my: '16px', borderRadius: '16px' }} />
                    </FlexColumn>

                </FlexColumn>

                {/* files */}

                {/* Exams */}
                {/* <CardExam /> */}

                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Divider sx={{ borderColor: 'primary.main', borderWidth: '2px', width: '60px', my: '16px', borderRadius: '16px' }} />
                        <Typography variant='h6' gutterBottom>
                            cardName
                        </Typography>
                        <Divider sx={{ borderColor: 'primary.main', borderWidth: '4px', width: '100%', my: '16px', borderRadius: '16px' }} />

                        <FlexBetween>
                            <Typography mx={"8px"} variant='subtitle1' borderBottom={'4px solid ' + theme.palette.primary.main} borderRadius={'2px'}>question numbers : </Typography>

                            <FlexRow justifyContent="center" gap={'6px'} bgcolor={'orange'} p={"8px 12px"} borderRadius={'12px'} mt={'4px'} color={'grey.1000'}>
                                <Typography variant='subtitle2' borderRadius={'4px'}>2020</Typography>
                            </FlexRow>
                        </FlexBetween>

                        <RowInfo title={'time'} desc="30:00" />

                    </CardContent>
                    <CardActions>
                        <Button size="small" sx={{ width: '100%' }}>Learn More</Button>
                    </CardActions>
                </Card>

            </FlexColumn>
        </Section>
    )
}

export default LecturePage
