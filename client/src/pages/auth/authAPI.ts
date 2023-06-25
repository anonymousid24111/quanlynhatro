import fetchHandler from "../../config/axios";

export const getMe = () => {
    return fetchHandler.get("/user/me");
};
