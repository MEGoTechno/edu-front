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
import { lang } from '../../settings/constants/arlang'
import { CiBarcode } from 'react-icons/ci'
import * as Yup from 'yup'

function RechargeCodePage() {

    const { user } = useSelector(s => s.global)
    const dispatch = useDispatch()

    const [sendData, status] = useVerifyCodeMutation()
    const [verifyCode] = usePostData(sendData)

    const inputs = [
        {
            name: 'code',
            label: lang.CODE,
            icon: <CiBarcode color='green' />,
            validation: Yup.string().matches(/^[0-9 -]{19}$/, 'الكود عباره عن 16 رقم')
        },
    ]

    const onSubmit = async (values, props) => {
        const res = await verifyCode(values)
        props.resetForm()
        dispatch(setUser({ ...user, ...res }))
    }

    return (
        <Section>
            <TitleSection title={'شحن كود'} />
            <FlexRow>
                <Typography variant='subtitle1'>اكتب الكود المكون من 16 رقم هنا</Typography>
                <MakeForm inputs={inputs} onSubmit={onSubmit} status={status} />
            </FlexRow>
        </Section>
    )
}

export default RechargeCodePage
