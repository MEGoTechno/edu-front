import GetSubscribedCourses from "../../pages/subscribtions/GetSubscribedCourses";
import { user_roles } from "../constants/roles";
import ProtectedRoute from "./ProtectedRoute";

export const subscriptions = [
    {
        path: '/management/subscriptions', element: <ProtectedRoute allowedTo={[user_roles.ADMIN, user_roles.SUBADMIN]}>
            <GetSubscribedCourses />
        </ProtectedRoute>
    }
]  