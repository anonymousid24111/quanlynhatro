import { PromiseStatus } from "../../utils";

export enum ApartmentStatus {
    Available = 0,
    Rented = 1,
    OutSoon = 2,
}

export enum RoomStatus {
    Available = 0,
    Rented = 1,
    OutSoon = 2,
}
export interface IService {
    name: string;
    cost: number;
    type: number;
    unit: string;
}

export interface IApartment {
    id: number;
    name: string;
    address: string;
    roomCount: number;
    status: ApartmentStatus;
    cost: number;
    city_code: number;
    district_code: number;
    ward_code: number;
    service: IService;
}
export interface IRoom {
    id: number;
    name: string;
    address: string;
    maxAllow: number;
    status: RoomStatus;
    cost: number;
    apartmentId: number;
}

export interface IAddApartmentDialog {
    isOpen: boolean;
    apartment: IApartment;
    status: PromiseStatus;
}

export interface IAddRoomDialog {
    isOpen: boolean;
    room: IRoom;
    status: PromiseStatus;
}
