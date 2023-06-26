import { Outlet, useNavigate } from "react-router-dom";
import ResponsiveAppBar, { INavItem } from "../../components/ResponsiveAppBar";
import { useAppDispatch } from "../../redux/hooks";
import { getMeAsync } from "../auth/authAction";
import { UserRole } from "../auth/models";
import { useEffect } from "react";
import useGetMe from "../../hooks/useGetMe";

const Guest = () => {
    const pages: INavItem[] = [
        {
            link: "/post",
            title: "Bảng tin",
        },
    ];
    const settings: INavItem[] = [
        {
            link: "/login",
            title: "Đăng nhập",
        },
    ];

    useGetMe();

    return (
        <>
            <ResponsiveAppBar pages={pages} settings={settings} />
            <Outlet />
        </>
    );
};

export default Guest;
