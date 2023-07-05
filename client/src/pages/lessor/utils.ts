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
export enum ServiceUnit {
    KWH,
    Person,
    Month,
    Block,
    EachOne,
}

export const defaultServiceList: IServiceModel[] = [
    {
        localId: nanoid(),
        name: "Tiền điện theo đồng hồ",
        type: ServiceType.DienCoDinhTheoDongHo,
        cost: 3500,
        unit: ServiceUnit.KWH,
        action: ServiceAction.Add,
    },
    {
        localId: nanoid(),
        name: "Tiền nước",
        type: ServiceType.NuocCoDinhTheoNguoi,
        cost: 80000,
        unit: ServiceUnit.Person,
        action: ServiceAction.Add,
    },
    {
        localId: nanoid(),
        name: "Tiền internet",
        type: ServiceType.MangInternet,
        cost: 3500,
        unit: ServiceUnit.Person,
        action: ServiceAction.Add,
    },
];

export const serviceTypeOptions = [
    // {
    //     label: "Điện luỹ tiến",
    //     value: ServiceType.DienLuyTien,
    //     unit: ServiceType.DienLuyTien,
    // },
    {
        label: "Điện cố định theo đồng hồ",
        value: ServiceType.DienCoDinhTheoDongHo,
        unit: ServiceUnit.KWH,
    },
    {
        label: "Điện cố định theo người",
        value: ServiceType.DienCoDinhTheoNguoi,
        unit: ServiceUnit.Person,
    },
    // {
    //     label: "Điện biến động",
    //     value: ServiceType.DienBienDong,
    // },
    // {
    //     label: "Nước luỹ tiến",
    //     value: ServiceType.NuocLuyTien,
    // },
    {
        label: "Nước cố định theo đồng hồ",
        value: ServiceType.NuocCoDinhTheoDongHo,
        unit: ServiceUnit.Block,
    },
    {
        label: "Nước cố định theo người",
        value: ServiceType.NuocCoDinhTheoNguoi,
        unit: ServiceUnit.Person,
    },
    // {
    //     label: "Nước biến động",
    //     value: ServiceType.NuocBienDong,
    // },
    {
        label: "Gửi xe",
        value: ServiceType.GuiXe,
        unit: ServiceUnit.EachOne,
    },
    {
        label: "Vệ sinh",
        value: ServiceType.VeSinh,
        unit: ServiceUnit.Person,
    },
    {
        label: "Mạng Internet",
        unit: ServiceUnit.Person,
        value: ServiceType.MangInternet,
    },
    {
        label: "Phí quản lý",
        value: ServiceType.PhiQuanLy,
        unit: ServiceUnit.Month,
    },
    {
        label: "Phí biến động khác",
        value: ServiceType.PhiBienDongKhac,
        unit: ServiceUnit.Month,
    },
    {
        label: "Dịch vụ khác",
        unit: ServiceUnit.Month,
        value: ServiceType.DichVuKhac,
    },
];

export const serviceUnitOptions = [
    {
        label: "đ/Kwh",
        value: ServiceUnit.KWH,
    },
    {
        label: "đ/Người",
        value: ServiceUnit.Person,
    },
    {
        label: "đ/Tháng",
        value: ServiceUnit.Month,
    },
    {
        label: "đ/Khối",
        value: ServiceUnit.Block,
    },
    {
        label: "Đồng/Chiếc/Tháng",
        value: ServiceUnit.EachOne,
    },
];
