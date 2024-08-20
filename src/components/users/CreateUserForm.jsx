import React from 'react'

import MakeForm from '../../tools/makeform/MakeForm'
import gradeConstants from '../../settings/constants/gradeConstants'
import governments from '../../settings/constants/governments'

// icons
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { MdMarkEmailRead } from "react-icons/md";
import { FaSquarePhoneFlip } from "react-icons/fa6";
import { PiPhoneDisconnectFill } from "react-icons/pi";
import { IoSchool } from "react-icons/io5";
import { RiGovernmentFill } from "react-icons/ri";
import { CiBarcode } from "react-icons/ci";
import { TbPasswordUser } from "react-icons/tb";

import { lang } from '../../settings/constants/arlang';
import { Box } from '@mui/material';
import Section from '../../style/mui/styled/Section';
import BannerIcon from '../ui/BannerIcon';
import { useCreateUserMutation } from '../../toolkit/apis/usersApi';

import usePostData from '../../hooks/usePostData'
import { makeArrWithValueAndLabel } from '../../tools/fcs/MakeArray';
import {user_roles} from '../../settings/constants/roles';
const gradeOptions = () => {
  let options = []
  gradeConstants.map(grade => {
    options.push({
      label: grade.name, value: grade.index
    },
    )
  })

  return options
}

const governmentsOptions = () => {
  let options = []
  governments.map(governorate => {
    options.push({
      label: governorate.governorate_name_ar, value: governorate.id
    },
    )
  })

  return options
}


function CreateUserForm() {

  const [sendData, status] = useCreateUserMutation()
  const [createUser] = usePostData(sendData)


  const inputs = [
    {
      name: 'name',
      label: lang.NAME,
      width: { xs: '100%', md: '49%' },
      icon: <MdOutlineDriveFileRenameOutline color='green' />,
    }, {
      name: 'userName',
      label: lang.USERNAME,
      width: { xs: '100%', md: '49%' },
      icon: <MdOutlineDriveFileRenameOutline color='green' />,
    }, {
      name: 'email',
      label: lang.EMAIL,
      width: { xs: '100%', md: '49%' },
      type: 'email',
      icon: <MdMarkEmailRead color='green' />,
    }, {
      name: 'phone',
      label: lang.PHONE,
      width: { xs: '100%', md: '49%' },
      icon: <FaSquarePhoneFlip color='green' />
    }, {
      name: 'familyPhone',
      label: lang.FAMILY_PHONE,
      width: { xs: '100%', md: '49%' },
      icon: <PiPhoneDisconnectFill color='green' />
    }, {
      name: 'grade',
      label: lang.GRADE,
      type: 'select',
      options: makeArrWithValueAndLabel(gradeConstants, { value: 'index', label: 'name' }),
      icon: <IoSchool color='green' />,
    }, {
      name: 'government',
      label: lang.GOVERNMENT,
      type: 'select',
      options: makeArrWithValueAndLabel(governments, { value: 'id', label: 'governorate_name_ar' }),
      icon: <RiGovernmentFill color='green' />,
      value: 4
    }, {
      name: 'role',
      label: lang.ROLE,
      type: 'select',
      options: [user_roles.ADMIN, user_roles.SUBADMIN, user_roles.STUDENT, user_roles.ONLINE, user_roles.INREVIEW],
    }, {
      name: 'password',
      label: lang.PASSWORD,
      icon: <TbPasswordUser color='green' />
    }, {
      name: 'confirmPassword',
      label: lang.CONFIRM_PASSWORD,
      icon: <TbPasswordUser color='green' />
    },
  ]

  const onSubmit = async (values, props)=> {
    await createUser(values)
  }
  return (
    <Section>
      <MakeForm inputs={inputs} btnWidth={'100%'} status={status} onSubmit={onSubmit} />
    </Section>
  )
}

export default CreateUserForm
