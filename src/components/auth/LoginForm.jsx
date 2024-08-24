import React from 'react'
import MakeForm from '../../tools/makeform/MakeForm'
import { useLoginMutation } from '../../toolkit/apis/usersApi'
import usePostData from '../../hooks/usePostData'

import { FaSquarePhoneFlip } from "react-icons/fa6";
import { TbPasswordUser } from "react-icons/tb";
import { setUser } from '../../toolkit/globalSlice';
import { useDispatch } from 'react-redux';

import { lang } from '../../settings/constants/arlang';
import * as Yup from "yup"



function LoginForm() {
    const inputs = [
        {
            label: lang.PHONE,
            name: 'userName',
            icon: <FaSquarePhoneFlip />,
            placeholder: lang.USERNAME + '/' + lang.CODE + '/' + lang.PHONE,
            validation: Yup.string().required(lang.REQUERIED)

        }, {
            label: lang.PASSWORD,
            name: 'password',
            direction: 'rtl',
            icon: <TbPasswordUser />,
            type: 'password',
            validation: Yup.string().required("مطلوب").min(6, "يجب ان يكون اكثر من 6")

        }
    ]

    const dispatch = useDispatch()
    const [sendData, status] = useLoginMutation()
    const [loginFc] = usePostData(sendData)

    const onSubmit = async (values) => {
        console.log(values)
        const res = await loginFc(values)
        console.log(res)
        dispatch(setUser(res))
    }

    return (
        <MakeForm inputs={inputs} status={status} onSubmit={onSubmit} />
    )
}

export default LoginForm
