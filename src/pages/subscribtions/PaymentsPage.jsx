import React from 'react'
import Section from '../../style/mui/styled/Section'
import TitleWithDividers from '../../components/ui/TitleWithDividers'
import Grid from '../../style/vanilla/Grid'
import DataWith3Items from '../../components/ui/DataWith3Items'
import Image from '../../components/ui/Image'
import { Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import ModalStyled from '../../style/mui/styled/ModalStyled'

import { useNavigate } from "react-router-dom"
import { MageVisaSquare } from './VisaIcon'
import { FilledHoverBtn } from '../../style/mui/btns/buttonsStyles'


function PaymentsPage() {

    const navigate = useNavigate()
    return (
        <Section>
            {/* <ModalStyled open={true} title={'الذهاب إلي الصفحه الرئيسيه ؟'} desc={'هذه الصفحه غير متاحه في وضع المشاهد الحالي ...!'} setOpen={()=>  clg} /> */}
            <Dialog
                open={true}
            >
                <DialogTitle>الذهاب إلي الصفحه الرئيسيه ؟</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        هذه الصفحه غير متاحه في وضع المشاهد الحالي ...!
                    </DialogContentText>
                    <DialogActions>
                        <FilledHoverBtn sx={{
                            minWidth: '100px'
                        }} onClick={() => navigate("/")}>الذهاب إلي الصفحه الرئيسيه </FilledHoverBtn>
                    </DialogActions>
                </DialogContent>

            </Dialog>
            <TitleWithDividers title={'طرق الدفع'} />

            <Grid min='500'>
                <FilledHoverBtn sx={{
                    minWidth: '100px'
                }} onClick={() => navigate("/")}> التعديل </FilledHoverBtn>
                <DataWith3Items icon={<Image img={'https://p7.hiclipart.com/preview/180/336/936/vodafone-customer-service-vodafone-egypt-telecommunication-vodafone-smart-mini-7-clean-corporate.jpg'} />} title={'Vodafone cash'} desc="************" />
                <DataWith3Items icon={<Image img={'https://th.bing.com/th/id/OIP.xqg777P9ZcYPOZ0YpSZoqQHaFj?rs=1&pid=ImgDetMain'} />} title={'Fawry cash'} desc="************" />
                <DataWith3Items icon={<Image img={'https://th.bing.com/th/id/R.cf8c1cf2785aaa0d57f3ca76e5597427?rik=9pQdAR8YW%2fwEbA&pid=ImgRaw&r=0'} />} title={'Paymob cash'} desc="************" />
                <DataWith3Items icon={<MageVisaSquare />} title={'Visa card'} desc="************" />
            </Grid>
        </Section>
    )
}

export default PaymentsPage
