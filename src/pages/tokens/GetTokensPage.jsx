import React, { useEffect, useState } from 'react'
import { useLazyGetTokensQuery } from '../../toolkit/apis/tokensApi'
import useLazyGetData from '../../hooks/useLazyGetData'
import MeDatagrid from '../../tools/datagrid/MeDatagrid'
import Section from '../../style/mui/styled/Section'
import { lang } from '../../settings/constants/arlang'
import TabInfo from '../../components/ui/TabInfo'
import { getFullDate } from '../../settings/constants/dateConstants'
import TitleSection from '../../components/ui/TitleSection'
import TitleWithDividers from '../../components/ui/TitleWithDividers'

function GetTokensPage() {


    const [getData, { isLoading }] = useLazyGetTokensQuery()
    const [getTokens] = useLazyGetData(getData)

    const fetchFc = async (params) => {
        const res = await getTokens()
        let values = []

        res?.tokens?.map((token) => {
            const item = {
                _id: token._id,
                token: token.token,
                name: token.user.name,
                userName: token.user.userName,
                loginDate: token.createdAt,
                logoutDate: token.logout
            }
            values.push(item)
        })
        const data = { values, count: res.count }
        return data
    }

    const columns = [
        {
            field: 'token',
            headerName: 'token',
            width: 200
        }, {
            field: 'name',
            headerName: lang.EMAIL,
            width: 200
        }, {
            field: 'userName',
            headerName: lang.USERNAME,
            width: 150
        }, {
            field: 'loginDate',
            headerName: 'login date',
            width: 200,
            renderCell: (params) => {
                return <TabInfo count={getFullDate(params.row.loginDate)} i={1} />
            }
        }, {
            field: 'logoutDate',
            headerName: 'logout date',
            width: 200,
            renderCell: (params) => {
                if (params.row.logoutDate) {
                    return <TabInfo count={getFullDate(params.row.logoutDate)} i={3} />
                } else {
                    return <TabInfo count={'is Logged'} i={1} />
                }

            }
        }
    ]

    return (
        <Section>
            <TitleWithDividers title={'tokens page'} />

            <MeDatagrid
                type={'crud'}
                columns={columns} fetchFc={fetchFc} loading={isLoading}
                editing={
                    {
                        bgcolor: 'background.alt',
                        showSlots: ["density", "filter", "columns", "export"]
                    }
                }
            />
        </Section>
    )
}

export default GetTokensPage
