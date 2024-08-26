import CreateCodePage from "../../pages/codes/CreateCodePage";
import GetCodesPage from "../../pages/codes/GetCodesPage";
import { user_roles } from "../constants/roles";
import ProtectedRoute from "./ProtectedRoute"

export const codesRoutes = [
    {
        path: '/management/codes', element: <ProtectedRoute allowedTo={[user_roles.ADMIN, user_roles.SUBADMIN]}>
            <GetCodesPage />
        </ProtectedRoute>
    },
    {
        path: '/management/codes/create', element: <ProtectedRoute allowedTo={[user_roles.ADMIN, user_roles.SUBADMIN]}>
            <CreateCodePage />
        </ProtectedRoute>
    }
]
