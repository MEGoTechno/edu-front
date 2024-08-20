import React, { memo, useEffect } from 'react'
import MakeForm from '../../tools/makeform/MakeForm'
import Section from '../../style/mui/styled/Section'
import { useCreateUnitMutation } from '../../toolkit/apis/unitsApi'
import usePostData from '../../hooks/usePostData'
import TitleWithDividers from '../section_title/TitleWithDividers'

function UnitCreate({ grade }) {

    const [sendData, status] = useCreateUnitMutation()
    const [createUnit] = usePostData(sendData)

    const onSubmit = async (values, props) => {
        const res = await createUnit(values)
        props.resetForm()
    }

    const inputs = [
        {
            name: 'grade',
            label: "",
            hidden: true,
            value: grade
        },
        {
            name: 'name',
            label: "Grade Name"
        },
    ]


    return (
        <Section sx={{ minWidth: '250px' }}>
            <TitleWithDividers title={'Create Unit'} />
            <MakeForm inputs={inputs} btnWidth={'100%'} onSubmit={onSubmit} status={status} enableReinitialize={true} />
        </Section>
    )
}

export default memo(UnitCreate)
