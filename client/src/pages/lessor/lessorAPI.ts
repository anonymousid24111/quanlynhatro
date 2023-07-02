import fetchHandler from "../../config/axios";
import { IApartment, IRoom } from "./models";

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
export const getRooms = () => {
    return fetchHandler.get("/room/list");
};
export const addRoom = (apartment: IRoom) => {
    return fetchHandler.post("/room/create", apartment);
};
export const updateRoom = (apartment: IRoom) => {
    return fetchHandler.post("/room/update/" + apartment.id, apartment);
};
