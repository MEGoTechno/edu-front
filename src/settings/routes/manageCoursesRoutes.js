
import ManageCoursesPage from "../../pages/management/ManageCoursesPage";
import { user_roles } from "../constants/roles";
import ProtectedRoute from "./ProtectedRoute";


export const manageCoursesRoutes = [
    {
        path: '/management/courses', element: <ProtectedRoute allowedTo={[user_roles.ADMIN, user_roles.SUBADMIN]}>
            <ManageCoursesPage />
        </ProtectedRoute>
    }
]  