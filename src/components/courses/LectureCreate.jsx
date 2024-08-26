import React, { useState } from 'react'
import { lang } from '../../settings/constants/arlang'
import { MdOutlineDriveFileRenameOutline } from 'react-icons/md'
import { AiFillPoundCircle } from 'react-icons/ai'
import { VscSymbolBoolean } from 'react-icons/vsc'
import MakeForm from '../../tools/makeform/MakeForm'
import { useCreateLectureMutation } from '../../toolkit/apis/lecturesApi'
import usePostData from '../../hooks/usePostData'

import Section from "../../style/mui/styled/Section"
import * as Yup from "yup"
import { Switch, Typography } from '@mui/material'
import { useField } from 'formik'


// const ChooseVideoPlayer = () => {

//     const [isYoutube, setYoutube] = useState(true)
//     const [video, setVideo] = useState()
//     const [field, meta, helpers] = useField('video')
//     console.log(field)
//     console.log(meta)
//     console.log(helpers)
//     const data = { player: isYoutube ? 'youtube' : 'server' }
//     return <>
//         <Typography variant='h1'>lectuer </Typography>
//         <Switch checked={meta.value} onChange={() => helpers.setValue(!meta.value)} />
//         {/* <MakeFile inputName={'video'} props={props} /> */}
//     </>
// }




function LectureCreate({ grade, unit, course, setLectures }) {

    const [sendData, status] = useCreateLectureMutation()
    const [createLecture] = usePostData(sendData)

    const inputs = [
        {
            name: 'grade',
            label: '',
            value: grade,
            hidden: true,
        }, {
            name: 'unit',
            label: '',
            value: unit,
            hidden: true,
        }, {
            name: 'course',
            label: '',
            value: course,
            hidden: true,
        }, {
            name: 'name',
            label: lang.LECTURE_NAME,
        }, {
            name: 'description',
            label: lang.LECTURE_DESCRIPTION,
            rows: 11,
        }, {
            name: 'isActive',
            label: lang.IS_ACTIVE,
            type: 'radio',
            value: true,
            options: [{ value: true, label: lang.ACTIVE }, { value: false, label: lang.NOT_ACTIVE }],
        }, {
            name: 'video',
            label: lang.VIDEO,
            type: 'file',
            width: '100%',
            validation: Yup.mixed().required(lang.REQUERIED)
                .test({
                    message: 'Please provide a supported video typed(mp4)',
                    test: (file, context) => {
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
            validation: Yup.mixed()
                .test({
                    message: 'Please provide a supported image typed(jpg or png)',
                    test: (file, context) => {
                        if (file) {
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
        }
    ]

    const onSubmit = async (values) => {
        const res = await createLecture(values, true)
        setLectures(prev => { return [...prev, res] })
    }

    return (
        <Section>

            <MakeForm inputs={inputs} onSubmit={onSubmit} status={status} />
        </Section>
    )
}

export default LectureCreate
