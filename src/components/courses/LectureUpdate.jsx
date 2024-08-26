import React, { useState } from 'react'
import MakeForm from '../../tools/makeform/MakeForm'
import { useUpdateLectureMutation } from '../../toolkit/apis/lecturesApi'
import usePostData from '../../hooks/usePostData'
import { lang } from '../../settings/constants/arlang'

import * as Yup from 'yup'

function LectureUpdate({ lecture }) {


    const [sendData, status] = useUpdateLectureMutation()

    const [updateLecture] = usePostData(sendData)
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
            rows: 11,
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
            value: lecture.video,
            validation: Yup.mixed().required(lang.REQUERIED)
                .test({
                    message: 'Please provide a supported video typed(mp4)',

                    test: (file, context) => {
                        if (file?.url) {
                            file.type = file.resource_type + "/" + file.format
                        }
                        const isValid = ['video/mp4'].includes(file?.type);
                        if (!isValid) context?.createError();
                        return isValid;
                    }
                })
                .test({
                    message: 'يجب ان يكون حجم الملف اقل من 15 ميغا فى وضع المشاهد',
                    test: (file) => {
                        const isValid = file?.size < 15 * 1000000;
                        return isValid;
                    }
                })
        }, {
            name: 'thumbnail',
            label: lang.THUMBNAIL,
            type: 'file',
            width: '100%',
            value: lecture.thumbnail,
            validation: Yup.mixed()
                .test({
                    message: 'Please provide a supported image typed(jpg or png)',
                    test: (file, context) => {
                        if (file) {
                            if (file?.url) {
                                file.type = file.resource_type + "/" + file.format
                            }
                            const isValid = ['image/png', 'image/jpg', 'image/jpeg'].includes(file?.type);
                            if (!isValid) context?.createError();
                            return isValid;
                        } else {
                            return true
                        }
                    }
                })
                .test({
                    message: 'يجب ان يكون حجم الملف اقل من 15 ميغا فى وضع المشاهد',
                    test: (file) => {
                        if (file) {
                            const isValid = file?.size < 15 * 1000000;
                            return isValid;
                        } else {
                            return true
                        }
                    }
                })
        },
    ]

    const onSubmit = async (values) => {
        const res = await updateLecture(values, true)
    }

    return (
        <MakeForm inputs={inputs} onSubmit={onSubmit} status={status} />
    )
}

export default LectureUpdate
