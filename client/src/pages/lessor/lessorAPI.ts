import fetchHandler from "../../config/axios";
import { IApartment } from "./models";

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
    return fetchHandler.post("/apartment/" + apartment.id, apartment);
};
