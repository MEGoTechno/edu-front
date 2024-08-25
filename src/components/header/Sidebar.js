import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Button, Divider, useTheme } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { Link, useNavigate } from 'react-router-dom';

import React, { useState } from 'react';
import LoginIcon from '@mui/icons-material/Login';
import MeToggler from '../ui/meToggler/MeToggler';
import { sidebarLinks } from '../../settings/sidebarLinks';
import ListLinks from './ListLinks';

import LoggedListLinks from './LoggedListLinks';
import { useDispatch, useSelector } from "react-redux"
import { ErrorBtn } from '../../style/mui/btns/buttonsStyles';
import ModalStyled from '../../style/mui/styled/ModalStyled';
import { setUser } from '../../toolkit/globalSlice';
import { lang } from '../../settings/constants/arlang';


export default function Sidebar({ isOpenedSideBar, setSideBar, isMobileScreen, sideBarWidth }) {

    const theme = useTheme()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(s => s.global.user)

    const logout = () => {
        setModal(false)
        dispatch(setUser(null))
        navigate('/')
    }
    const [openModal, setModal] = useState(false)
    return (
        <Box component="nav" sx={{ transition: "all .3s  ease !important" }}>

            <Drawer
                variant={"temporary"}
                anchor='left'
                open={isOpenedSideBar}
                onClose={() => setSideBar(false)}
                sx={{
                    width: sideBarWidth || '250px',
                    zIndex: 50,
                    backgroundImage: 'none',
                    "& .MuiDrawer-paper": {
                        backgroundImage: 'none',
                        color: theme.palette.text.primary,
                        backgroundColor: theme.palette.background.default,
                        borderWidth: "2px",
                        width: sideBarWidth || '250px',
                    },
                }}
            >
                <Box width="100%" mt={"70px"}>
                    {/* drawer items */}
                    <Divider />
                    <LoggedListLinks user={user} setSidebar={setSideBar} />
                </Box>

                {/* logout */}
                {user && <Box display="flex" alignItems="end" mt={'auto'} >
                    <ErrorBtn sx={{ mx: "10px", width: '100%' }} onClick={(() => {
                        setModal(true)
                    })} >
                        {lang.LOGOUT}
                    </ErrorBtn>
                </Box>}

            </Drawer >
            <ModalStyled
                open={openModal}
                setOpen={setModal}
                title={'هل انت متاكد من تسجيل الخروج ؟'}
                action={logout}
            />
        </Box >
    );
}