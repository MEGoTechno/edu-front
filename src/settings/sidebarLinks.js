import { FaHome } from "react-icons/fa";
import { LoginIcon, SignupIcon } from "../components/header/Icons";
import { user_roles } from "./constants/roles";

export const sidebarLinks = [
    {
        name: "تسجيل الدخول", icon: <LoginIcon size="22px" />, to: "/login",
    },
    {
        name: "انشاء حساب", icon: <SignupIcon size="22px" />, to: "/signup",
    }, {
        name: "الكورسات", icon: <SignupIcon size="22px" />, to: "/grades", allowedTo: [user_roles.STUDENT]
    }, {
        name: "محاضراتى", icon: <SignupIcon size="22px" />, to: "/courses", allowedTo: [user_roles.STUDENT]
    }, {
        name: "اداره الحساب", allowedTo: [user_roles.STUDENT]
    }, {
        name: "حسابى", icon: <SignupIcon size="22px" />, to: "/profile", allowedTo: [user_roles.STUDENT]
    }, {
        name: "شحن كود", icon: <SignupIcon size="22px" />, to: "/user/codes", allowedTo: [user_roles.STUDENT]
    }, {
        name: "مدفوعاتى", icon: <SignupIcon size="22px" />, to: "/user/payments", allowedTo: [user_roles.STUDENT]
    }, {
        name: "إدارة الطلاب", icon: <SignupIcon size="22px" />, allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN]
    }, {
        name: "عرض الطلاب", icon: <SignupIcon size="22px" />, to: "/management/users", allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN]
    }, {
        name: "إدارة المحتوى", icon: <SignupIcon size="22px" />, allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN]
    }, {
        name: "عرض الكورسات", icon: <SignupIcon size="22px" />, to: "/management/courses", allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN]
    }, {
        name: "إدارة المدفوعات", icon: <SignupIcon size="22px" />, allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN]
    }, {
        name: "عرض الاشتراكات", icon: <SignupIcon size="22px" />, to: "/management/subscriptions", allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN]
    }, {
        name: "عرض الاكواد", icon: <SignupIcon size="22px" />, to: "/management/codes", allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN]
    }, {
        name: "انشاء كود", icon: <SignupIcon size="22px" />, to: "/management/codes/create", allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN]
    }, {
        name: "وسايل الدفع", icon: <SignupIcon size="22px" />, to: "/management/payments", allowedTo: [user_roles.ADMIN, user_roles.SUBADMIN]
    }
]