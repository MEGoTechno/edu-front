import HomePage from "../../pages/home/HomePage";
import TestPage from "../../pages/test/TestPage";
import Layout from "../../pages/Layout";
import ErrorPage from "../../pages/errors/ErrorPage";

import LoginPage from "../../pages/auth/LoginPage";
import SignupPage from "../../pages/auth/SignupPage";

import GradesPage from "../../pages/grades/GradesPage";
import UnitsPage from "../../pages/grades/UnitsPage";
import CoursePage from "../../pages/courses/CoursePage";
import LecturePage from "../../pages/lectures/LecturePage";
import gradesRoutes from "./gradesRoutes";
import { manageUserRoutes } from "./manageUserRoutes";
import { manageCoursesRoutes } from "./manageCoursesRoutes";

import { codesRoutes } from "./codesRoutes";
import LectureCreate from "../../components/courses/LectureCreate";
import { userRoutes } from "./userRoutes";

export const routes = [
    {
        path: "/", element: <Layout />, errorElement: <ErrorPage />,
        children: [
            {
                index: true, element: <HomePage />
            }, {
                path: '/user', children: userRoutes
            },
            {
                path: 'courses/:courseId', element: <CoursePage />
            },
            {
                path: 'courses/:courseId/lectures/:lectureId', element: <LecturePage />
            },
            {
                path: '/grades', children: gradesRoutes,
            }, {
                path: '/management/users', children: manageUserRoutes,
            }, {
                path: '/management/courses', children: manageCoursesRoutes,
            }, {
                path: '/management/codes', children: codesRoutes,
            },
            {
                path: '/management/lectures/create', element: <LectureCreate />
            }, {
                path: '/login', element: <LoginPage />
            }, {
                path: '/signup', element: <SignupPage />
            }, {
                path: '/test', element: <TestPage />
            }, {
                path: '*', element: <>Not Found 404</>
            }
        ]
    },
]