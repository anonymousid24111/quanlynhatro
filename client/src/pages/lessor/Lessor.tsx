import { Outlet, useNavigate } from "react-router-dom";
import ResponsiveAppBar, { INavItem } from "../../components/ResponsiveAppBar";
import { useAppDispatch } from "../../redux/hooks";
import { getMeAsync } from "../auth/authAction";
import { UserRole } from "../auth/models";
import { useEffect } from "react";
import useGetMe from "../../hooks/useGetMe";

const Lessor = () => {
    const pages: INavItem[] = [
        {
            link: "/lessor/post",
            title: "Bảng tin",
        },
        {
            link: "/lessor/report",
            title: "Thống kê",
        },
        {
            link: "/lessor/apartment",
            title: "Nhà",
        },
        {
            link: "/lessor/room",
            title: "Phòng",
        },
        {
            link: "/lessor/bill",
            title: "Hoá đơn",
        },
    ];
    const settings: INavItem[] = [
        {
            link: "/lessor/profile",
            title: "Thông tin tài khoản",
        },
        {
            link: "/lessor/logout",
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

export default Lessor;
