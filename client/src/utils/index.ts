import { IUserInfo, UserRole } from "../pages/auth/models";

export enum PromiseStatus {
    None = 0,
    Pending = 1,
    Fulfilled = 2,
    Failed = 3,
}

export const defaultUserInfo: IUserInfo = {
    id: -1,
    phone: "",
    role: UserRole.Guest,
    username: "",
};
