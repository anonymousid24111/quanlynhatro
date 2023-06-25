import { Outlet, useNavigate } from "react-router-dom";
import ResponsiveAppBar, { INavItem } from "../../components/ResponsiveAppBar";
import { useAppDispatch } from "../../redux/hooks";
import { getMeAsync } from "../auth/authAction";
import { UserRole } from "../auth/models";
import { useEffect } from "react";

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

export default Guest;
