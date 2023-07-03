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

export enum ServiceType {
    DienLuyTien,
    DienCoDinhTheoDongHo,
    DienCoDinhTheoNguoi,
    DienBienDong,
    NuocLuyTien,
    NuocCoDinhTheoDongHo,
    NuocCoDinhTheoNguoi,
    NuocBienDong,
    GuiXe,
    VeSinh,
    MangInternet,
    PhiQuanLy,
    PhiBienDongKhac,
    DichVuKhac,
}

export interface IService {
    name: string;
    cost: number;
    type: ServiceType;
    unit: string;
}

export enum ServiceAction {
    Add = 0,
    Edit = 1,
    Delete = 2,
}
export interface IServiceModel extends IService {
    localId: string;
    action: ServiceAction;
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
    services: IService[];
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
