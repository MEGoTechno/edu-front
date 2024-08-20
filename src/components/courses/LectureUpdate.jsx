import React, { useState } from 'react'
import MakeForm from '../../tools/makeform/MakeForm'
import { useUpdateLectureMutation } from '../../toolkit/apis/lecturesApi'
import usePostData from '../../hooks/usePostData'
import { lang } from '../../settings/constants/arlang'

function LectureUpdate({ lecture }) {

    const [sendData, status] = useUpdateLectureMutation()
    const [updateLecture] = usePostData(sendData)
// console.log(lecture)
    const inputs = [
        {
            name: 'id',
            label: '',
            value: lecture._id,
            hidden: true
        }, {
            name: 'name',
            label: lang.LECTURE_NAME,
            value: lecture.name
        }, {
            name: 'description',
            label: lang.LECTURE_DESCRIPTION,
            value: lecture.description,
            type: 'editor'
        }, {
            name: 'isActive',
            label: lang.IS_ACTIVE,
            type: 'radio',
            value: `${lecture.isActive || false}`,
            options: [{ value: true, label: lang.ACTIVE }, { value: false, label: lang.NOT_ACTIVE }],
        }, {
            name: 'video',
            label: lang.VIDEO,
            type: 'file',
            width: '100%',
            value: lecture.video
        }, {
            name: 'thumbnail',
            label: lang.THUMBNAIL,
            type: 'file',
            width: '100%',
            value: lecture.thumbnail
        },
    ]

    const onSubmit = async (values) => {
        console.log(values)
        const res = await updateLecture(values, true)
        console.log(res)
    }

    return (
        <MakeForm inputs={inputs} onSubmit={onSubmit} status={status}/>
    )
}

export default LectureUpdate
