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
    email: string;
    birthDay: string;
    city_code: number;
    district_code: number;
    ward_code: number;
    address: string;
    idNumber: number;
    dateOfIssue: string;
    placeOfIssue: string;
}
