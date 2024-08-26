import { Avatar, Box, Typography } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'

import Section from "../../style/mui/styled/Section"
import TitleSection from '../../components/ui/TitleSection'
import MeDatagrid from '../../tools/datagrid/MeDatagrid'
import { useDeleteUserMutation, useLazyGetUsersQuery, useUpdateUserMutation } from '../../toolkit/apis/usersApi'
import useLazyGetData from '../../hooks/useLazyGetData'
import { user_roles } from '../../settings/constants/roles'
import gradeConstants from '../../settings/constants/gradeConstants'
import { filterArrWithValue, makeArrWithValueAndLabel } from '../../tools/fcs/MakeArray'
import TabsStyled from '../../style/mui/styled/TabsStyled'
import { useLazyGetUsersCountQuery } from '../../toolkit/apis/statisticsApi'
import LoaderSkeleton from '../../style/mui/loaders/LoaderSkeleton'

import { lang } from '../../settings/constants/arlang'
import ModalStyled from '../../style/mui/styled/ModalStyled'
import CreateUser from '../../components/users/CreateUser'
import { FilledHoverBtn } from '../../style/mui/btns/buttonsStyles'
import { FlexColumn } from '../../style/mui/styled/Flexbox'
import GradesTabs from '../../components/grades/GradesTabs'
import usePostData from '../../hooks/usePostData'
import TabInfo from '../../components/ui/TabInfo'


function GetUsersPage() {


    const [gradesCounts, setGradeCounts] = useState({})
    const [grade, setGrade] = useState(null)
    const [open, setOpen] = useState(false)

    //get users
    const [getData, { isLoading, data }] = useLazyGetUsersQuery()
    const [getUsers] = useLazyGetData(getData)

    const fetchFc = async (params) => {
        const res = await getUsers(params, false)
        const data = { values: res.users, count: res.count }
        return data
    }

    //get users count
    const [getStatistics, status] = useLazyGetUsersCountQuery()
    const [getUsersCount] = useLazyGetData(getStatistics)

    useEffect(() => {
        const trigger = async () => {
            const allGrades = await getUsersCount({ grade: 'all' })
            const grade1 = await getUsersCount({ grade: 1, })
            const grade2 = await getUsersCount({ grade: 2 })
            const grade3 = await getUsersCount({ grade: 3 })

            setGradeCounts({
                allGrades, grade1, grade2, grade3
            })
        }

        trigger()
    }, [])


    const columns = [
        {
            field: "avatar",
            headerName: lang.IMAGE,
            disableExport: true,
            renderCell: (params) => {
                return (
                    <Avatar alt={params.row.name.toUpperCase()} src={params.row?.avatar?.url || "#"}
                        sx={{
                            objectFit: 'contain',
                            bgcolor: 'primary.main',
                            fontWeight: 600,
                            color: 'grey.0'
                        }} />
                )
            }
        },
        {
            field: 'name',
            headerName: lang.NAME,
            width: 200
        }, {
            field: 'email',
            headerName: lang.EMAIL,
            width: 200
        }, {
            field: 'userName',
            headerName: lang.USERNAME,
            width: 150

        }, {
            field: 'isActive',
            headerName: lang.IS_ACTIVE,
            type: "boolean",
            editable: true,
            valueGetter: (params) => params.row?.isActive,
            renderCell: (params) => {
                return (
                    <Box>
                        {params.row.isActive ? <TabInfo count={lang.ACTIVE} i={1} />
                            : <TabInfo count={lang.NOT_ACTIVE} i={3} />}
                    </Box>
                )
            }
        }, {
            field: 'phone',
            headerName: lang.PHONE,
            width: 200

        }, {
            field: 'familyPhone',
            headerName: lang.FAMILY_PHONE,
            width: 200
        }, {
            field: 'wallet',
            headerName: lang.WALLET,
            width: 200
        }, {
            field: 'role',
            headerName: lang.ROLE,
            type: 'singleSelect',
            valueOptions: [user_roles.INREVIEW, user_roles.ONLINE, user_roles.STUDENT, user_roles.ADMIN, user_roles.SUBADMIN,],
            editable: true
        }, {
            field: "grade",
            headerName: lang.GRADE,
            type: 'singleSelect',
            width: 200,
            valueOptions: makeArrWithValueAndLabel(gradeConstants, { value: 'index', label: 'name' }),
            renderCell: (params) => {
                const grade = gradeConstants.filter(({ index }) => index === params.row.grade)[0]
                return (
                    <Typography>
                        {params.row.role === user_roles.ADMIN ? user_roles.ADMIN
                            : grade?.name}
                    </Typography>
                )
            }
        }, {
            field: 'group',
            headerName: lang.GROUP,
        }
    ]

    const [sendData, { isLoading: updateLoader }] = useUpdateUserMutation()
    const [updateUser] = usePostData(sendData)

    const updateFc = async (values) => {
        const user = await updateUser(values)
        return user
    }

    const [deleteData, { isLoading: deleteLoader }] = useDeleteUserMutation()
    const [deleteUser] = usePostData(deleteData)

    const deleteFc = async (id) => {
        await deleteUser({ _id: id })
    }
    return (
        <Section>
            <TitleSection title={lang.USERS_PAGE} />
            <FlexColumn sx={{ width: '100%' }}>
                <FilledHoverBtn onClick={() => setOpen(true)} >create user</FilledHoverBtn>
            </FlexColumn>

            <GradesTabs setGrade={setGrade} counts={gradesCounts} />

            <MeDatagrid
                filterParams={{ grade: grade || 'all' }}
                type={'crud'}
                columns={columns} fetchFc={fetchFc} loading={isLoading || updateLoader || deleteLoader} updateFc={updateFc} deleteFc={deleteFc}
                editing={
                    {
                        bgcolor: 'background.alt',
                        showSlots: ["density", "filter", "columns", "export"]
                    }
                }
            />

            <ModalStyled open={open} setOpen={setOpen} >
                <CreateUser />
            </ModalStyled>
        </Section>
    )
}


export default GetUsersPage
