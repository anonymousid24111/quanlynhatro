import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import Admin from "./pages/admin/Admin";
import PostManagement from "./pages/admin/postmanagement/PostManagement";
import UserManagement from "./pages/admin/usermangement/UserManagement";
import Guest from "./pages/guest/Guest";
import Lessor from "./pages/lessor/Lessor";
import Apartment from "./pages/lessor/apartment/Apartment";
import Report from "./pages/lessor/report/Report";
import RoomLessor from "./pages/lessor/room/Room";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import Tenant from "./pages/tenant/Tenant";
import Bill from "./pages/tenant/bill/Bill";
import BillLessor from "./pages/lessor/bill/Bill";
import Post from "./pages/tenant/post/Post";
import Profile from "./pages/tenant/profile/Profile";
import Room from "./pages/tenant/room/Room";
import { store } from "./redux/store";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Guest />,
        children: [
            {
                index: true,
                element: <Post />,
            },
            {
                path: "post",
                element: <Post />,
            },
        ],
    },
    {
        path: "/admin",
        element: <Admin />,
        children: [
            {
                index: true,
                element: <Post />,
            },
            {
                path: "post",
                element: <Post />,
            },
            {
                path: "post_management",
                element: <PostManagement />,
            },
            {
                path: "user_management",
                element: <UserManagement />,
            },
            {
                path: "profile",
                element: <Profile />,
            },
        ],
    },
    {
        path: "/lessor",
        element: <Lessor />,
        children: [
            {
                index: true,
                element: <Apartment />,
            },
            {
                path: "report",
                element: <Report />,
            },
            {
                path: "post",
                element: <Post />,
            },
            {
                path: "bill",
                element: <BillLessor />,
            },
            {
                path: "apartment",
                element: <Apartment />,
            },
            {
                path: "room",
                element: <RoomLessor />,
            },
            {
                path: "profile",
                element: <Profile />,
            },
        ],
    },
    {
        path: "/tenant",
        element: <Tenant />,
        children: [
            {
                index: true,
                element: <Post />,
            },
            {
                path: "post",
                element: <Post />,
            },
            {
                path: "bill",
                element: <Bill />,
            },
            {
                path: "room",
                element: <Room />,
            },
            {
                path: "profile",
                element: <Profile />,
            },
        ],
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/signup",
        element: <SignUp />,
    },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
        <ToastContainer position="top-right" autoClose={3000} />
    </React.StrictMode>
);
