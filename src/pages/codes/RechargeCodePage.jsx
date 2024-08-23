import React from 'react'
import Section from '../../style/mui/styled/Section'
import TitleSection from '../../components/ui/TitleSection'
import { FlexRow } from '../../style/mui/styled/Flexbox'
import { Typography } from '@mui/material'
import MakeForm from '../../tools/makeform/MakeForm'
import { useVerifyCodeMutation } from '../../toolkit/apis/codesApi'

import usePostData from "../../hooks/usePostData"
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../../toolkit/globalSlice'

function RechargeCodePage() {

    const { user } = useSelector(s => s.global)
    const dispatch = useDispatch()

    const [sendData, status] = useVerifyCodeMutation()
    const [verifyCode] = usePostData(sendData)

    const inputs = [
        {
            label: 'Your code',
            name: 'code'
        }
    ]

    const onSubmit = async (values, props) => {
        const res = await verifyCode(values)
        props.resetForm()
        dispatch(setUser({ ...user, ...res }))
    }

    return (
        <Section>
            <TitleSection title={'recharge code'} />
            <FlexRow>
                <Typography variant='subtitle1'>insert Your code here</Typography>
                <MakeForm inputs={inputs} onSubmit={onSubmit} status={status} />
            </FlexRow>
        </Section>
    )
}

export default RechargeCodePage
