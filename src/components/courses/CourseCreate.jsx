import React, { memo, useEffect } from 'react'
import MakeForm from '../../tools/makeform/MakeForm'
import Section from '../../style/mui/styled/Section'
import usePostData from '../../hooks/usePostData'
import TitleWithDividers from '../ui/TitleWithDividers'
import { useCreateCourseMutation } from '../../toolkit/apis/coursesApi'
import { lang } from '../../settings/constants/arlang'
import { VscSymbolBoolean } from 'react-icons/vsc'

function CourseCreate({ unit, grade, setCourse }) {

    const [sendData, status] = useCreateCourseMutation()
    const [createCourse] = usePostData(sendData)

    const onSubmit = async (values, props) => {
        const res = await createCourse(values)
        if (setCourse) {
            setCourse(res._id)
        }
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
            label: "Course Name"
        }, {
            name: 'description',
            label: "Course description",
            type: 'editor'
        }, {
            name: 'isActive',
            label: lang.IS_ACTIVE,
            type: 'radio',
            options: [{ value: true, label: lang.ACTIVE }, { value: false, label: lang.NOT_ACTIVE }],
            icon: <VscSymbolBoolean />
        },
        {
            name: 'price',
            label: "Course Price",
            type: 'number'
        }, {
            name: 'discount',
            label: "Course Discount",
            type: 'number'
        },
    ]


    return (
        <Section sx={{ minWidth: '250px' }}>
            <TitleWithDividers title={'Create Unit'} />
            <MakeForm inputs={inputs} btnWidth={'100%'} onSubmit={onSubmit} status={status} enableReinitialize={true} />
        </Section>
    )
}

export default memo(CourseCreate)
