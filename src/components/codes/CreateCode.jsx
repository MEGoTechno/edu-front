import React, { memo, useState } from 'react'
import MakeSelect from '../../style/mui/styled/MakeSelect'
import { makeArrWithValueAndLabel } from '../../tools/fcs/MakeArray'
import { codeConstants } from '../../settings/constants/codeConstants'
import Section from '../../style/mui/styled/Section'
import MakeForm from '../../tools/makeform/MakeForm'
import { Alert, Typography } from '@mui/material'
import gradeConstants from '../../settings/constants/gradeConstants'
import { useCreateCodeMutation } from '../../toolkit/apis/codesApi'

import usePostData from '../../hooks/usePostData'
function CreateCode({setReset}) {


    const [sendData, status] = useCreateCodeMutation()
    const [createCode] = usePostData(sendData)


    const [type, setType] = useState(codeConstants.ACTIVATE)

    const activateInput = [
        {
            name: 'type',
            label: 'code type',
            type: 'select',
            options: [codeConstants.ACTIVATE],
        }, {
            name: 'uses',
            label: 'code uses',
            type: 'number',
            value: 1
        }
    ]
    const walletInputs = [
        {
            name: 'type',
            label: 'code type',
            type: 'select',
            options: [codeConstants.WALLET],
        }, {
            name: 'uses',
            label: 'code uses',
            type: 'number',
            value: 1
        }, {
            name: 'price',
            label: 'code price',
            type: 'number'
        }
    ]
    const centerInputs = [
        {
            name: 'type',
            label: 'code type',
            type: 'select',
            options: [codeConstants.CENTER],
        }, {
            name: 'uses',
            label: 'code uses',
            type: 'number',
            value: 1
        }, {
            name: 'grade',
            label: 'code grade',
            type: 'select',
            options: makeArrWithValueAndLabel(gradeConstants, { value: 'index', label: 'name' }),
        }
    ]

    const onSubmit = async (values, props) => {
        const res = await createCode(values)
        setReset(pre => !pre)
        props.resetForm()
    }

    return (
        <Section>
            <Typography variant='h6' textAlign={'center'} borderBottom={'4px solid'} my={'16px'}>create code</Typography>
            <MakeSelect title={'choose code type'} value={type} setValue={setType}
                options={[codeConstants.ACTIVATE, codeConstants.CENTER, codeConstants.WALLET]}
            />

            {type === codeConstants.ACTIVATE ?
                <MakeForm status={status}
                    enableReinitialize={true} onSubmit={onSubmit} inputs={activateInput} /> :
                type === codeConstants.CENTER ?
                    <MakeForm status={status}
                        enableReinitialize={true} onSubmit={onSubmit} inputs={centerInputs} /> :
                    type === codeConstants.WALLET &&
                    <MakeForm status={status}
                        enableReinitialize={true} onSubmit={onSubmit} inputs={walletInputs} />}

            {status?.data && (
                <Alert severity='success' variant='filled'>code: {status.data.values.code}</Alert>
            )}
        </Section>
    )
}

export default memo(CreateCode)
