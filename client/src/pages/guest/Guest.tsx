import { useEffect } from "react";
import fetchHandler from "../../config/axios";

const Guest = () => {
    const getUserInfo = async () => {
        const { data } = await fetchHandler.get("/user/1");
        console.log("data", data);
    };

    useEffect(() => {
        getUserInfo();
    }, []);

    return <div>Guest</div>;
};

export default Guest;
