import fetchHandler from "../../config/axios";
import { IApartment, IContract, IRoom } from "./models";

export const getApartments = () => {
    return fetchHandler.get("/apartment/list");
};
export const deleteApartment = (id: number) => {
    return fetchHandler.delete("/apartment/" + id);
};
export const addApartment = (apartment: IApartment) => {
    return fetchHandler.post("/apartment/create", apartment);
};
export const updateApartment = (apartment: IApartment) => {
    return fetchHandler.post("/apartment/update/" + apartment.id, apartment);
};

export const deleteRoom = (id: number) => {
    return fetchHandler.delete("/room/" + id);
};
export const getRooms = ({ id }: { id: number }) => {
    return fetchHandler.get("/room/list", {
        params: {
            id,
        },
    });
};
export const addRoom = (apartment: IRoom) => {
    return fetchHandler.post("/room/create", apartment);
};
export const addContract = (apartment: IContract) => {
    return fetchHandler.post("/room/createContract", apartment);
};
export const updateRoom = (apartment: IRoom) => {
    return fetchHandler.post("/room/update/" + apartment.id, apartment);
};
