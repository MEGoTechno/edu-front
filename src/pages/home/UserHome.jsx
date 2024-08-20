import React from 'react'
import Section from '../../style/mui/styled/Section'
import UserHeader from '../../components/ui/UserHeader'
import { useSelector } from 'react-redux'
import { Divider, Typography } from '@mui/material'

function UserHome() {

    const { user } = useSelector(s => s.global)

    return (
        <Section sx={{ minHeight: '86vh' }}>
            <Typography variant='subBanner' >
                مرحبًا :  {user.name}
            </Typography>
            <Divider sx={{ border: '4px solid', borderColor: "primary.main", my: '8px' }} />
            <UserHeader user={user} flexDirection={'row'} variant={'square'} />
        </Section>
    )
}

export default UserHome
