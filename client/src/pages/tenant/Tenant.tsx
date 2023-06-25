import { Outlet, useNavigate } from "react-router-dom";
import ResponsiveAppBar, { INavItem } from "../../components/ResponsiveAppBar";
import { useAppDispatch } from "../../redux/hooks";
import { getMeAsync } from "../auth/authAction";
import { UserRole } from "../auth/models";
import { useEffect } from "react";

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

export default Tenant;
