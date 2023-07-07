import { nanoid } from "@reduxjs/toolkit";
import {
    ApartmentStatus,
    IApartment,
    IRoom,
    IServiceModel,
    RoomStatus,
    ItemAction,
    ServiceType,
    IContract,
    IBill,
    IBillService,
} from "./models";
import { defaultUserInfo } from "../../utils";

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
    acreage: 0,
    deposit: 0,
    equipments: [],
};
export const defaultContract: IContract = {
    collectionDate: 1,
    cost: 0,
    deposit: 0,
    paymentCycle: 1,
    customer: defaultUserInfo,
    roomId: 0,
};

export enum ServiceUnit {
    KWH,
    Person,
    Month,
    Block,
    EachOne,
}

export const defaultBill: IBill = {
    applyMonth: "",
    billservices: [],
    status: 0,
    totalCost: 0,
    roomId: 0,
};

export const defaultBillService: IBillService = {
    ...defaultBill,
    cost: 0,
    count: 0,
    endNumber: 0,
    name: "",
    startNumber: 0,
    totalCost: 0,
    type: ServiceType.DichVuKhac,
    unit: ServiceUnit.Month,
    localId: nanoid(),
    action: ItemAction.Add,
};

export const defaultServiceList: IServiceModel[] = [
    {
        localId: nanoid(),
        name: "Tiền điện theo đồng hồ",
        type: ServiceType.DienCoDinhTheoDongHo,
        cost: 3500,
        unit: ServiceUnit.KWH,
        action: ItemAction.Add,
    },
    {
        localId: nanoid(),
        name: "Tiền nước",
        type: ServiceType.NuocCoDinhTheoNguoi,
        cost: 80000,
        unit: ServiceUnit.Person,
        action: ItemAction.Add,
    },
    {
        localId: nanoid(),
        name: "Tiền internet",
        type: ServiceType.MangInternet,
        cost: 3500,
        unit: ServiceUnit.Person,
        action: ItemAction.Add,
    },
];

export const defaultBillServiceList: IBillService[] = [
    {
        localId: nanoid(),
        name: "Tiền điện theo đồng hồ",
        type: ServiceType.DienCoDinhTheoDongHo,
        cost: 3500,
        unit: ServiceUnit.KWH,
        action: ItemAction.Add,
        count: 0,
        endNumber: 0,
        startNumber: 0,
        totalCost: 0,
    },
    {
        localId: nanoid(),
        name: "Tiền nước",
        type: ServiceType.NuocCoDinhTheoNguoi,
        cost: 80000,
        unit: ServiceUnit.Person,
        action: ItemAction.Add,
        count: 0,
        endNumber: 0,
        startNumber: 0,
        totalCost: 0,
    },
    {
        localId: nanoid(),
        name: "Tiền internet",
        type: ServiceType.MangInternet,
        cost: 3500,
        unit: ServiceUnit.Person,
        action: ItemAction.Add,
        count: 0,
        endNumber: 0,
        startNumber: 0,
        totalCost: 0,
    },
];

export const formatDateMMYYYY = (date?: string) => {
    if (!date) return "";
    const currentDate = new Date(date);
    const yyyy = currentDate.getFullYear();
    const MM = currentDate.getMonth() + 1;
    return `${MM}/${yyyy}`;
};

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
        label: "đ/Kwhs",
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
export enum EquipmentType {
    BanCong = "Ban công",
    BaoVe = "Bảo vệ",
    Camera = "Camera",
    DieuHoa = "Điều hoà",
    GacXep = "Gác xép",
    Giuong = "Giường",
    NhaBep = "Nhà bếp",
    BaiDeXe = "Bãi để xe",
    ThangMay = "Thang máy",
    Tivi = "Tivi",
    TuLanh = "Tủ lạnh",
    Internet = "Internet",
    BinhNongLanh = "Bình nóng lạng",
    Wifi = "Wifi",
    WC = "WC",
    TuQuanAo = "Tủ quần áo",
    MayGiat = "Máy giặt",
}

export const equipmentOptions = [
    {
        label: "Ban công",
        value: EquipmentType.BanCong,
    },
    {
        label: "Bảo vệ",
        value: EquipmentType.BaoVe,
    },
    {
        label: "Camera",
        value: EquipmentType.Camera,
    },
    {
        label: "Điều hoà",
        value: EquipmentType.DieuHoa,
    },
    {
        label: "Gác xép",
        value: EquipmentType.GacXep,
    },
    {
        label: "Giường",
        value: EquipmentType.Giuong,
    },
    {
        label: "Nhà bếp",
        value: EquipmentType.NhaBep,
    },
    {
        label: "Bãi để xe",
        value: EquipmentType.BaiDeXe,
    },
    {
        label: "Thang máy",
        value: EquipmentType.ThangMay,
    },
    {
        label: "Tivi",
        value: EquipmentType.Tivi,
    },
    {
        label: "Tủ lạnh",
        value: EquipmentType.TuLanh,
    },
    {
        label: "Internet",
        value: EquipmentType.Internet,
    },
    {
        label: "Bình nóng lạnh",
        value: EquipmentType.BinhNongLanh,
    },
    {
        label: "Wifi",
        value: EquipmentType.Wifi,
    },
    {
        label: "WC",
        value: EquipmentType.WC,
    },
    {
        label: "Tủ quần áo",
        value: EquipmentType.TuQuanAo,
    },
    {
        label: "Máy giặt",
        value: EquipmentType.MayGiat,
    },
];

export const paymentCycleOptions = [
    {
        label: "1 tháng",
        value: 1,
    },
    {
        label: "2 tháng",
        value: 2,
    },
    {
        label: "3 tháng",
        value: 3,
    },
    {
        label: "4 tháng",
        value: 4,
    },
    {
        label: "5 tháng",
        value: 5,
    },
    {
        label: "6 tháng",
        value: 6,
    },
    {
        label: "1 năm",
        value: 12,
    },
];
