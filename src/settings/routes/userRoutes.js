import RechargeCodePage from "../../pages/codes/RechargeCodePage";

export const userRoutes = [
    {
        path: '/user/profile', element: <>profile is here</>
    },
    {
        path: '/user/payments', element: <>profile is here</>
    },
    {
        path: '/user/statistics', element: <>profile is here</>
    }, {
        path: '/user/recharge_code', element: <RechargeCodePage />
    }
]