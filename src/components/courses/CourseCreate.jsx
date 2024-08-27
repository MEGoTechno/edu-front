import React, { memo, useEffect, useState } from 'react'
import MakeForm from '../../tools/makeform/MakeForm'
import Section from '../../style/mui/styled/Section'
import usePostData from '../../hooks/usePostData'
import TitleWithDividers from '../ui/TitleWithDividers'
import { useCreateCourseMutation } from '../../toolkit/apis/coursesApi'
import { lang } from '../../settings/constants/arlang'
import { VscSymbolBoolean } from 'react-icons/vsc'
import { AiFillPoundCircle } from 'react-icons/ai'

import * as Yup from "yup"



function CourseCreate({ unit, grade, setCourses }) {

    const [sendData, status] = useCreateCourseMutation()
    const [createCourse] = usePostData(sendData)

    const onSubmit = async (values, props) => {
        const res = await createCourse(values)
        setCourses(pre => { return [...pre, res] })
        props.resetForm()
    }

    const inputs = [
        {
            name: 'unit',
            label: "",
            hidden: true,
            value: unit
        }, {
            name: 'grade',
            label: "",
            hidden: true,
            value: grade
        },
        {
            name: 'name',
            label: lang.COURSE_NAME
        }, {
            name: 'description',
            label: "Course description",
            type: 'editor'
        }, {
            name: 'isActive',
            label: lang.IS_ACTIVE,
            type: 'radio',
            options: [{ value: true, label: lang.ACTIVE }, { value: false, label: lang.NOT_ACTIVE }],
            icon: <VscSymbolBoolean />,
            value: true
        }, {
            name: 'price',
            label: lang.PRICE,
            icon: <AiFillPoundCircle />,
            width: "40%",
            validation: Yup
                .number()
                .integer()
                .required()
        }, {
            name: 'preDiscount',
            label: 'السعر قبل الخصم',
            icon: <AiFillPoundCircle />,
            width: "40%",
            validation: Yup
                .number()
                .required()
                .integer()
                .nullable()
                .moreThan(Yup.ref("price")) //<-- a whole lot neater than using a when conditional...
        }
    ]


    return (
        <Section sx={{ minWidth: '250px' }}>
            <TitleWithDividers title={'انشاء كورس'} />
            <MakeForm inputs={inputs} btnWidth={'100%'} onSubmit={onSubmit} status={status} enableReinitialize={true} />
        </Section>
    )
}

export default memo(CourseCreate)
