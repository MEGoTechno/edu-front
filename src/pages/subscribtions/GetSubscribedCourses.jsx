import React, { useEffect, useState } from 'react'
import { useGetAllUsersCoursesQuery, useLazyGetAllUsersCoursesQuery } from '../../toolkit/apis/userCoursesApi'
import useLazyGetData from '../../hooks/useLazyGetData'
import MeDatagrid from '../../tools/datagrid/MeDatagrid'
import { lang } from '../../settings/constants/arlang'
import { Box, Typography } from '@mui/material'
import TabInfo from "../../components/ui/TabInfo"
import { makeArrWithValueAndLabel } from '../../tools/fcs/MakeArray'
import gradeConstants from '../../settings/constants/gradeConstants'
import { user_roles } from '../../settings/constants/roles'
import { getFullDate } from '../../settings/constants/dateConstants'
import Section from '../../style/mui/styled/Section'
import TitleWithDividers from '../../components/ui/TitleWithDividers'

function GetSubscribedCourses() {

    const [getData] = useLazyGetAllUsersCoursesQuery()
    const [getUsersCourses] = useLazyGetData(getData)

    const [loading, setLoading] = useState(false)
    const [rows, setRows] = useState([])

    useEffect(() => {
        const trigger = async () => {
            setLoading(true)
            const res = await getUsersCourses()
            const modified = res.usersCourses.map((({ user, course, createdAt, _id }) => {

                return {
                    _id,
                    name: user.name,
                    userName: user.userName,
                    isActive: user.isActive,
                    wallet: user.wallet,
                    grade: user.grade,
                    courseName: course.name,
                    price: course.price,
                    subscribedAt: createdAt
                }
            }))

            setRows(modified)
            setLoading(false)
        }

        trigger()
    }, [])

    const columns = [
        {
            field: 'name',//user name
            headerName: lang.NAME,
            width: 200,
            // valueFormatter: ({ value }) => value.name
        }, {
            field: 'userName',
            headerName: lang.USERNAME,
            width: 150,
            // valueFormatter: ({ value }) => value.userName

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
            field: 'wallet',
            headerName: lang.WALLET,
            width: 200

        }, {
            field: "grade",
            headerName: lang.GRADE,
            type: 'singleSelect',
            width: 200,
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
            field: 'courseName',
            headerName: lang.COURSE_NAME,
            width: 200
        }, {
            field: 'price',
            headerName: lang.PRICE,
            width: 200
        }, {
            field: 'subscribedAt',
            headerName: 'تاريخ الاشتراك',
            width: 200,
            renderCell: (params) => {
                return (
                    <Box>
                        <TabInfo count={getFullDate(params.row.subscribedAt)} i={1} />
                    </Box>
                )
            }
        },
    ]

    return (
        <Section>
            <TitleWithDividers title={'اشتراكات الطلاب'} />
            <MeDatagrid type={'simple'} data={rows} columns={columns} loading={loading} />
        </Section>
    )
}

export default GetSubscribedCourses
