import { Box, Drawer, useMediaQuery } from '@mui/material'
import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/header/Navbar'
import Sidebar from '../components/header/Sidebar'
import GlobalMsg from '../components/ui/GlobalMsg'




function Layout() {


    const isMobileScreen = useMediaQuery('(max-width:600px)');
    const [isOpenedSidebar, setSidebar] = useState(false)


    return (
        <Box>
            <Navbar isOpenedSidebar={isOpenedSidebar} setSidebar={setSidebar} isMobileScreen={isMobileScreen} />
            <Sidebar isOpenedSideBar={isOpenedSidebar} setSideBar={setSidebar} />
            <Box>
                <Outlet />
            </Box>
            <GlobalMsg />
        </Box>
    )
}

export default Layout
