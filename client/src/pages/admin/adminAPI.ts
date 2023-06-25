import fetchHandler from "../../config/axios";

export const getTenants = () => {
    return fetchHandler.get("/user/tenants");
};
