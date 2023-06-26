export enum UserRole {
    Guest = 0,
    Tenant = 1,
    Lessor = 2,
    Admin = 3,
}

export interface IUserInfo {
    id: number;
    username: string;
    phone: string;
    role: UserRole;
    password?: string;
}
