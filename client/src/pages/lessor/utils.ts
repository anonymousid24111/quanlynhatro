import { nanoid } from "@reduxjs/toolkit";
import {
    ApartmentStatus,
    IApartment,
    IRoom,
    IServiceModel,
    RoomStatus,
    ServiceAction,
    ServiceType,
} from "./models";

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
    services: [],
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

export const defaultServiceList: IServiceModel[] = [
    {
        localId: nanoid(),
        name: "Tiền điện theo đồng hồ",
        type: ServiceType.DienCoDinhTheoDongHo,
        cost: 3500,
        unit: "đ/KWh",
        action: ServiceAction.Add,
    },
    {
        localId: nanoid(),
        name: "Tiền nước",
        type: ServiceType.NuocCoDinhTheoNguoi,
        cost: 80000,
        unit: "đ/người",
        action: ServiceAction.Add,
    },
    {
        localId: nanoid(),
        name: "Tiền internet",
        type: ServiceType.MangInternet,
        cost: 3500,
        unit: "đ/Tháng",
        action: ServiceAction.Add,
    },
];

export const serviceTypeOptions = [
    {
        label: "Điện luỹ tiến",
        value: ServiceType.DienLuyTien,
    },
    {
        label: "Điện cố định theo đồng hồ",
        value: ServiceType.DienCoDinhTheoDongHo,
    },
    {
        label: "Điện cố định theo người",
        value: ServiceType.DienCoDinhTheoNguoi,
    },
    {
        label: "Điện biến động",
        value: ServiceType.DienBienDong,
    },
    {
        label: "Nước luỹ tiến",
        value: ServiceType.NuocLuyTien,
    },
    {
        label: "Nước cố định theo đồng hồ",
        value: ServiceType.NuocCoDinhTheoDongHo,
    },
    {
        label: "Nước cố định theo người",
        value: ServiceType.NuocCoDinhTheoNguoi,
    },
    {
        label: "Nước biến động",
        value: ServiceType.NuocBienDong,
    },
    {
        label: "Gửi xe",
        value: ServiceType.GuiXe,
    },
    {
        label: "Vệ sinh",
        value: ServiceType.VeSinh,
    },
    {
        label: "Mạng Internet",
        value: ServiceType.MangInternet,
    },
    {
        label: "Phí quản lý",
        value: ServiceType.PhiQuanLy,
    },
    {
        label: "Phí biến động khác",
        value: ServiceType.PhiBienDongKhac,
    },
    {
        label: "Dịch vụ khác",
        value: ServiceType.DichVuKhac,
    },
];
