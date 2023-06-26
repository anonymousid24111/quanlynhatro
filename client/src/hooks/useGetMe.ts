import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getMeAsync } from "../pages/auth/authAction";
import { UserRole } from "../pages/auth/models";
import { useAppDispatch } from "../redux/hooks";

const useGetMe = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const fetchMe = async () => {
        const { payload } = await dispatch(getMeAsync());
        const { data } = payload;
        const { role } = data || {};

        if (role === UserRole.Tenant && !location.pathname.includes("tenant")) {
            navigate("/tenant");
        }
        if (role === UserRole.Lessor && !location.pathname.includes("lessor")) {
            navigate("/lessor");
        }
        if (role === UserRole.Admin && !location.pathname.includes("admin")) {
            navigate("/admin");
        }
        if (role === UserRole.Guest) {
            navigate("/");
        }
    };

    useEffect(() => {
        fetchMe();
    }, []);
    return {};
};

export default useGetMe;
