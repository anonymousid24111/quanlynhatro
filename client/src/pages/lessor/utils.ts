import { ApartmentStatus, IApartment } from "./models";

export const defaultApartment: IApartment = {
    id: 0,
    address: "",
    cost: 0,
    name: "",
    roomCount: 0,
    status: ApartmentStatus.Available,
};
