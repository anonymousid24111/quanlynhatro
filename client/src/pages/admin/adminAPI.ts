import fetchHandler from "../../config/axios";
import { IUserInfo } from "../auth/models";

export const getTenants = () => {
    return fetchHandler.get("/user/tenants");
};
export const deleteTetant = (id: number) => {
    return fetchHandler.delete("/user/tenant/" + id);
};
export const addTetant = (user: IUserInfo) => {
    return fetchHandler.post("/user/create", user);
};
export const updateTetant = (user: IUserInfo) => {
    return fetchHandler.post("/user/" + user.id, user);
};
