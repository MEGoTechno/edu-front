import RechargeCodePage from "../../pages/codes/RechargeCodePage";
import UserProfilePage from '../../pages/users/UserProfilePage'

export const userRoutes = [
    {
        path: '/user/profile', element: <UserProfilePage />
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