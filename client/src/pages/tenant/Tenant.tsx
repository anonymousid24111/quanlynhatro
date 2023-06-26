import { Outlet, useNavigate } from "react-router-dom";
import ResponsiveAppBar, { INavItem } from "../../components/ResponsiveAppBar";
import { useAppDispatch } from "../../redux/hooks";
import { getMeAsync } from "../auth/authAction";
import { UserRole } from "../auth/models";
import { useEffect } from "react";
import useGetMe from "../../hooks/useGetMe";

const Tenant = () => {
    const pages: INavItem[] = [
        {
            link: "/tenant/post",
            title: "Bảng tin",
        },
        {
            link: "/tenant/room",
            title: "Phòng",
        },
        {
            link: "/tenant/bill",
            title: "Hoá đơn",
        },
    ];
    const settings: INavItem[] = [
        {
            link: "/tenant/profile",
            title: "Thông tin tài khoản",
        },
        {
            link: "/tenant/logout",
            title: "Đăng xuất",
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

export default Tenant;
