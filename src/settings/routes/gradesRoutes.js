import CoursePage from "../../pages/courses/CoursePage"
import GradesPage from "../../pages/grades/GradesPage"
import UnitsPage from "../../pages/grades/UnitsPage"
import LecturePage from "../../pages/lectures/LecturePage"
import ProtectedRoute from "./ProtectedRoute"
import { user_roles } from "../constants/roles";

const gradesRoutes = [
    {
        path: '/grades', element: <GradesPage />
    }, {
        path: '/grades/:gradeId', element: <UnitsPage />
    }, {
        path: '/grades/:gradeId/courses/:courseId', element: <CoursePage />
    }, {
        path: '/grades/:gradeId/courses/:courseId/lectures/:lectureId', element: <ProtectedRoute allowedTo={[user_roles.STUDENT, user_roles.ONLINE]}>
            <LecturePage />
        </ProtectedRoute>
    }
]

export default gradesRoutes