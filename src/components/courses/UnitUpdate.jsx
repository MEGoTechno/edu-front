import React, { useEffect } from 'react'
import MakeForm from '../../tools/makeform/MakeForm'

import { useUpdateUnitMutation } from '../../toolkit/apis/unitsApi'
import usePostData from "../../hooks/usePostData"
import Section from '../../style/mui/styled/Section'


function UnitUpdate({ unit }) {

    const [sendData] = useUpdateUnitMutation()
    const [updateUnit] = usePostData(sendData)

    const trigger = async (values) => {
        console.log(values)
        // const res = await updateUnit(values, false, unit.grade)
        // console.log(res)
    }

    const inputs = [
        {
            name: 'grade',
            label: "",
            hidden: true,
            value: unit.grade
        },
        {
            name: 'name',
            label: "unit Name",
            value: unit.name
        },
    ]

    return (
        <Section>

            <MakeForm inputs={inputs} onSubmit={trigger} enableReinitialize={true} />
        </Section>
    )
}


export default UnitUpdate
