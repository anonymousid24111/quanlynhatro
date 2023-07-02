import { ApartmentStatus, IApartment, IRoom, RoomStatus } from "./models";

export const defaultApartment: IApartment = {
    id: 0,
    address: "",
    cost: 0,
    name: "",
    roomCount: 0,
    status: ApartmentStatus.Available,
    city_code: 0,
    district_code: 0,
    ward_code: 0,
    service: {
        name: "",
        cost: 0,
        type: 0,
        unit: "",
    },
};
export const defaultRoom: IRoom = {
    id: 0,
    address: "",
    cost: 0,
    name: "",
    maxAllow: 0,
    status: RoomStatus.Available,
    apartmentId: -1,
};
