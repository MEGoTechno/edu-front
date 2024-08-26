import React from 'react'
import MakeForm from '../../tools/makeform/MakeForm'
import { useUpdateCourseMutation } from '../../toolkit/apis/coursesApi'
import usePostData from '../../hooks/usePostData'
import { lang } from '../../settings/constants/arlang'

import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { AiFillPoundCircle } from "react-icons/ai";

import { VscSymbolBoolean } from "react-icons/vsc";


import * as Yup from "yup"

function CourseUpdate({ course }) {

    // console.log(course)

    const [sendData, status] = useUpdateCourseMutation()
    const [updateCourse] = usePostData(sendData)
    const inputs = [
        {
            name: 'id',
            label: '',
            value: course._id,
            hidden: true
        },
        {
            name: 'name',
            label: lang.COURSE_NAME,
            value: course.name,
            icon: <MdOutlineDriveFileRenameOutline />
        }, {
            name: 'description',
            label: lang.COURSE_DESCRIPTION,
            value: course.description,
            type: 'editor'
        }, {
            name: 'price',
            label: lang.PRICE,
            value: course.price,
            icon: <AiFillPoundCircle />,
            width: "40%",
            validation: Yup
                .number()
                .integer()
                .required()
        }, {
            name: 'preDiscount',
            label: 'السعر قبل الخصم',
            value: course.preDiscount,
            icon: <AiFillPoundCircle />,
            width: "40%",
            validation: Yup
                .number()
                .integer()
                .nullable()
                .moreThan(Yup.ref("price")) //<-- a whole lot neater than using a when conditional...
            // .max(currentYear + 1)
            // ref: 'isDiscount'
        }, {
            name: 'isActive',
            label: lang.IS_ACTIVE,
            type: 'radio',
            value: `${course.isActive || false}`,
            options: [{ value: true, label: lang.ACTIVE }, { value: false, label: lang.NOT_ACTIVE }],
            icon: <VscSymbolBoolean />,
            width: "100%",
        }
    ]

    const onSubmit = async (values, props) => {
        const res = await updateCourse(values)
    }
    return (
        <MakeForm inputs={inputs} onSubmit={onSubmit} status={status} />
    )
}

export default CourseUpdate
