import CreateUser from "../../components/users/CreateUser";
import GetUsersPage from "../../pages/users/GetUsersPage";

export const manageUserRoutes = [
    {
        path: '/management/users', element: <GetUsersPage />
    },
    {
        path: '/management/users/create', element: <CreateUser />
    },
]  