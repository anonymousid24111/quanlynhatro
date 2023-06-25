import { Outlet, useNavigate } from "react-router-dom";
import ResponsiveAppBar, { INavItem } from "../../components/ResponsiveAppBar";
import { useAppDispatch } from "../../redux/hooks";
import { getMeAsync } from "../auth/authAction";
import { UserRole } from "../auth/models";
import { useEffect } from "react";

const Admin = () => {
    const pages: INavItem[] = [
        {
            link: "/admin/post",
            title: "Bảng tin",
        },
        {
            link: "/admin/post_management",
            title: "Quản lý đăng",
        },
        {
            link: "/admin/user_management",
            title: "Quản lý chủ nhà",
        },
    ];
    const settings: INavItem[] = [
        {
            link: "/admin/profile",
            title: "Thông tin tài khoản",
        },
        {
            link: "/admin/logout",
            title: "Đăng xuất",
        },
    ];

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const fetchMe = async () => {
        const { payload } = await dispatch(getMeAsync());
        const { data } = payload;
        const { role } = data || {};

        if (role === UserRole.Tenant) {
            navigate("/tenant");
        }
        if (role === UserRole.Lessor) {
            navigate("/lessor");
        }
        if (role === UserRole.Admin) {
            navigate("/admin");
        }
        if (role === UserRole.Guest) {
            navigate("/");
        }
    };

    useEffect(() => {
        fetchMe();
    }, []);

    return (
        <>
            <ResponsiveAppBar pages={pages} settings={settings} />
            <Outlet />
        </>
    );
};

export default Admin;
