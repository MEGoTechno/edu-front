import React, { useState } from 'react'
import Section from '../../style/mui/styled/Section'
import SectionTitle from '../../components/section_title/SectionTitle'
import TitleWithDividers from '../../components/section_title/TitleWithDividers'
import MeDatagrid from '../../tools/datagrid/MeDatagrid'

import { useDeleteCodeMutation, useLazyGetCodesQuery, useUpdateCodeMutation } from '../../toolkit/apis/codesApi'
import useLazyGetData from '../../hooks/useLazyGetData'
import usePostData from '../../hooks/usePostData'
import ModalStyled from '../../style/mui/styled/ModalStyled'
import CreateCode from '../../components/codes/CreateCode'
import { Button } from '@mui/material'
import { FilledHoverBtn } from '../../style/mui/btns/buttonsStyles'
import { FlexColumn } from '../../style/mui/styled/Flexbox'


function GetCodesPage() {

    const [reset, setReset] = useState(false)

    const [getData] = useLazyGetCodesQuery()
    const [getCodes] = useLazyGetData(getData)

    const fetchFc = async (params) => {
        const res = await getCodes(params, false)
        const codes = { values: res.codes, count: res.count }
        return codes
    }

    //update
    const [updateData] = useUpdateCodeMutation()
    const [updateCode] = usePostData(updateData)

    const updateFc = async (values) => {
        const res = await updateCode(values)
        return res
    }

    //delete
    const [deleteData] = useDeleteCodeMutation()
    const [deleteCode] = usePostData(deleteData)

    const deleteFc = async (id) => {
        await deleteCode({ _id: id })
    }

    const columns = [
        {
            field: 'code',
            headerName: "code",
            width: 180
        }, {
            field: 'price',
            headerName: "price",
            width: 170,
            type: 'number',
            editable: true
        }, {
            field: 'grade',
            headerName: "grade",
            width: 170

        }, {
            field: 'type',
            headerName: 'type of code',
            type: 'singleSelect',
            width: 170
        }, {
            field: 'usedBy',
            headerName: "used by",
            width: 170
        }, {
            field: 'isActive',
            headerName: "isActive",
            type: "boolean",
            width: 170,
            editable: true

        }, {
            field: 'numbers',
            headerName: "numbers of use",
            width: 170,
            editable: true
        },
    ]


    const [open, setOpen] = useState(false)
    return (
        <Section>
            <TitleWithDividers title={'codes page'} />

            <FlexColumn>
                <FilledHoverBtn onClick={() => setOpen(true)}>create code</FilledHoverBtn>
            </FlexColumn>

            <MeDatagrid type={'crud'} columns={columns} reset={reset}
                fetchFc={fetchFc} updateFc={updateFc} deleteFc={deleteFc}
            />


            <ModalStyled open={open} setOpen={setOpen} >
                <CreateCode setReset={setReset} />
            </ModalStyled>
        </Section>
    )
}

export default GetCodesPage
