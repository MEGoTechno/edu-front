import React, { useEffect, useState } from 'react'
import { useLazyGetUserCoursesQuery } from '../../toolkit/apis/userCoursesApi'
import useLazyGetData from '../../hooks/useLazyGetData'
import Section from '../../style/mui/styled/Section'
import TitleWithDividers from '../../components/ui/TitleWithDividers'
import { Box } from '@mui/material'
import TabInfo from '../../components/ui/TabInfo'
import { getFullDate } from '../../settings/constants/dateConstants'
import { lang } from '../../settings/constants/arlang'
import MeDatagrid from '../../tools/datagrid/MeDatagrid'

function UserPayments() {
    const [getData] = useLazyGetUserCoursesQuery()
    const [getUserCourses] = useLazyGetData(getData)

    const [loading, setLoading] = useState(false)
    const [rows, setRows] = useState([])

    useEffect(() => {
        const trigger = async () => {
            setLoading(true)
            const courses = await getUserCourses()
            const modified = courses.map((({ course, createdAt, _id }) => {

                return {
                    _id,
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
            <TitleWithDividers title={'اشتراكات '} />
            <MeDatagrid type={'simple'} data={rows} columns={columns} loading={loading} />
        </Section>
    )
}

export default UserPayments
