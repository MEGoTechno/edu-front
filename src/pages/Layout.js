import { Box, Drawer, useMediaQuery } from '@mui/material'
import React, { Suspense, useEffect, useLayoutEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../components/header/Navbar'
import Sidebar from '../components/header/Sidebar'
import GlobalMsg from '../components/ui/GlobalMsg'

import LoaderSkeleton from "../style/mui/loaders/LoaderSkeleton"


function Layout() {

    const location = useLocation()
    const isMobileScreen = useMediaQuery('(max-width:600px)');
    const [isOpenedSidebar, setSidebar] = useState(false)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location])

    return (
        <Box>
            <Navbar isOpenedSidebar={isOpenedSidebar} setSidebar={setSidebar} isMobileScreen={isMobileScreen} />
            <Sidebar isOpenedSideBar={isOpenedSidebar} setSideBar={setSidebar} />
            <Suspense fallback={<LoaderSkeleton />}>
                <Box>
                    <Outlet />
                </Box>
            </Suspense>
            <GlobalMsg />
        </Box>
    )
}

export default Layout
