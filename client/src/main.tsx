import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import Admin from "./pages/admin/Admin";
import Guest from "./pages/guest/Guest";
import Lessor from "./pages/lessor/Lessor";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import Tenant from "./pages/tenant/Tenant";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Guest />,
    },
    {
        path: "/admin",
        element: <Admin />,
    },
    {
        path: "/lessor",
        element: <Lessor />,
    },
    {
        path: "/tenant",
        element: <Tenant />,
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
