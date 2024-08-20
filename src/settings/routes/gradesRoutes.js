import CoursePage from "../../pages/courses/CoursePage"
import GradesPage from "../../pages/grades/GradesPage"
import UnitsPage from "../../pages/grades/UnitsPage"
import LecturePage from "../../pages/lectures/LecturePage"

const gradesRoutes = [
    {
        path: '/grades', element: <GradesPage />
    }, {
        path: '/grades/:gradeId', element: <UnitsPage />
    }, {
        path: '/grades/:gradeId/courses/:courseId', element: <CoursePage />
    }, {
        path: '/grades/:gradeId/courses/:courseId/lectures/:lectureId', element: <LecturePage />
    },
]

export default gradesRoutes