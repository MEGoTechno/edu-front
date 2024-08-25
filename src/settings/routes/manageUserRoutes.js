import CreateUser from "../../components/users/CreateUser";
import GetUsersPage from "../../pages/users/GetUsersPage";
import { user_roles } from "../constants/roles";
import ProtectedRoute from "./ProtectedRoute";

export const manageUserRoutes = [
    {
        path: '/management/users', element: <ProtectedRoute allowedTo={[user_roles.ADMIN, user_roles.SUBADMIN]}>
            <GetUsersPage />
        </ProtectedRoute>
    },
    {
        path: '/management/users/create', element: <ProtectedRoute allowedTo={[user_roles.ADMIN, user_roles.SUBADMIN]}>
            <CreateUser />
        </ProtectedRoute>
    },
]  