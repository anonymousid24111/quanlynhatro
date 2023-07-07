import { PromiseStatus } from "../../utils";
import { IUserInfo } from "../auth/models";
import { EquipmentType } from "./utils";

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
    unit: string | number;
}

export enum ItemAction {
    Add = 0,
    Edit = 1,
    Delete = 2,
}
export interface IServiceModel extends IService {
    localId: string;
    action: ItemAction;
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
export interface IEquipment {
    id: number;
    name: EquipmentType;
}

export interface IEquipmentModel extends IEquipment {
    localId: string;
    action: ItemAction;
}
export interface IRoom {
    id: number;
    name: string;
    address: string;
    maxAllow: number;
    status: RoomStatus;
    cost: number;
    apartmentId: number;
    equipments: IEquipment[];
    acreage: number;
    deposit: number;
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
export interface IAddContractDialog {
    isOpen: boolean;
    contract: IContract;
    status: PromiseStatus;
}

export interface IBillService extends IService {
    localId: string;
    action: ItemAction;
    startNumber: number;
    endNumber: number;
    count: number;
    totalCost: number;
}
export interface IBill {
    status: number;
    applyMonth: string;
    totalCost: number;
    billservices: IBillService[];
    roomId: number;
}
export interface IAddBillDialog {
    isOpen: boolean;
    bill: IBill;
    status: PromiseStatus;
}

export interface ICustomer extends IUserInfo {}
export interface IContract {
    startDate?: string;
    endDate?: string;
    cost: number;
    deposit: number;
    paymentCycle: number;
    collectionDate: number;
    customer: ICustomer;
    roomId: number;
}
