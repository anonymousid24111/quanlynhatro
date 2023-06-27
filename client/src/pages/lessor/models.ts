import { PromiseStatus } from "../../utils";

export enum ApartmentStatus {
    Available = 0,
    Rented = 1,
    OutSoon = 2,
}

export interface IApartment {
    id: number;
    name: string;
    address: string;
    roomCount: number;
    status: ApartmentStatus;
    cost: number;
}

export interface IAddDialog {
    isOpen: boolean;
    apartment: IApartment;
    status: PromiseStatus;
}
