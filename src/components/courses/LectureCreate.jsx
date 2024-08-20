import React from 'react'
import { lang } from '../../settings/constants/arlang'
import { MdOutlineDriveFileRenameOutline } from 'react-icons/md'
import { AiFillPoundCircle } from 'react-icons/ai'
import { VscSymbolBoolean } from 'react-icons/vsc'
import MakeForm from '../../tools/makeform/MakeForm'
import { useCreateLectureMutation } from '../../toolkit/apis/lecturesApi'
import usePostData from '../../hooks/usePostData'

import Section from "../../style/mui/styled/Section"
function LectureCreate({ grade, unit, course, addLecture }) {

    const [sendData, status] = useCreateLectureMutation()
    const [createLecture] = usePostData(sendData)

    const inputs = [
        {
            name: 'grade',
            label: '',
            value: grade,
            hidden: true
        }, {
            name: 'unit',
            label: '',
            value: unit,
            hidden: true
        }, {
            name: 'course',
            label: '',
            value: course,
            hidden: true
        }, {
            name: 'name',
            label: lang.LECTURE_NAME,
        }, {
            name: 'description',
            label: lang.LECTURE_DESCRIPTION,
            type: 'editor'
        }, {
            name: 'isActive',
            label: lang.IS_ACTIVE,
            type: 'radio',
            options: [{ value: true, label: lang.ACTIVE }, { value: false, label: lang.NOT_ACTIVE }],
        }, {
            name: 'video',
            label: lang.VIDEO,
            type: 'file',
            width: '100%',
        }, {
            name: 'thumbnail',
            label: lang.THUMBNAIL,
            type: 'file',
            width: '100%',
        },
    ]

    const onSubmit = async (values) => {
        const res = await createLecture(values, true)
        addLecture(res)
    }

    return (
        <Section>

            <MakeForm inputs={inputs} onSubmit={onSubmit} status={status} />
        </Section>
    )
}

export default LectureCreate
