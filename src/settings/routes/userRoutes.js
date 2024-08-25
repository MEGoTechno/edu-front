import RechargeCodePage from "../../pages/codes/RechargeCodePage";
import UserProfilePage from '../../pages/users/UserProfilePage'
import { user_roles } from "../constants/roles";
import ProtectedRoute from "./ProtectedRoute";

export const userRoutes = [
    {
        path: '/user/profile', element: <ProtectedRoute allowedTo={'all'}>
            <UserProfilePage />
        </ProtectedRoute>
    },
    // {
    //     path: '/user/payments', element: <>profile is here</>
    // },
    {
        path: '/user/statistics', element: <ProtectedRoute allowedTo={[user_roles.ONLINE, user_roles.STUDENT]}>
            statistics
        </ProtectedRoute>
    }, {
        path: '/user/recharge_code', element: <ProtectedRoute allowedTo={[user_roles.ONLINE, user_roles.STUDENT]}>
            <RechargeCodePage />
        </ProtectedRoute>
    }
]