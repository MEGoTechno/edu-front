import HomePage from "../../pages/home/HomePage";
import TestPage from "../../pages/test/TestPage";
import Layout from "../../pages/Layout";
import PaymentsPage from "../../pages/subscribtions/PaymentsPage";
import { lazy, Suspense, useEffect, useState } from 'react'

import ErrorPage from "../../pages/errors/ErrorPage";

// import LoginPage from "../../pages/auth/LoginPage";
// import SignupPage from "../../pages/auth/SignupPage";

// import CoursePage from "../../pages/courses/CoursePage";
// import LecturePage from "../../pages/lectures/LecturePage";

// import NotFoundPage from "../../pages/errors/NotFoundPage";
// import LectureCreate from "../../components/courses/LectureCreate";

import gradesRoutes from "./gradesRoutes";
import { manageUserRoutes } from "./manageUserRoutes";
import { manageCoursesRoutes } from "./manageCoursesRoutes";

import { codesRoutes } from "./codesRoutes";
import { userRoutes } from "./userRoutes";
import { subscriptions } from "./subscriptions";

const LoginPage = lazy(() => import("../../pages/auth/LoginPage"))
const SignupPage = lazy(() => import("../../pages/auth/SignupPage"))

const CoursePage = lazy(() => import("../../pages/courses/CoursePage"))
const LecturePage = lazy(() => import("../../pages/lectures/LecturePage"))
const LectureCreate = lazy(() => import("../../components/courses/LectureCreate"))
const NotFoundPage = lazy(() => import("../../pages/errors/NotFoundPage"))
const GetTokensPage = lazy(() => import("../../pages/tokens/GetTokensPage"))


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
            }, {
                path: '/management/subscriptions', children: subscriptions,
            }, {
                path: '/management/lectures/create', element: <LectureCreate />
            }, {
                path: '/management/payments', element: <PaymentsPage />
            }, {
                path: '/management/tokens', element: <GetTokensPage />
            }, {
                path: '/login', element: <LoginPage />
            }, {
                path: '/signup', element: <SignupPage />
            }, {
                path: '/test', element: <TestPage />
            }, {
                path: '*', element: <NotFoundPage />
            }
        ]
    },
]