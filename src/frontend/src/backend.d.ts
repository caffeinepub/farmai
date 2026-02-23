import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface UserProfile {
    userType: UserType;
    name?: string;
    role: UserRole;
    email: string;
    passwordHash: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export enum UserType {
    admin = "admin",
    buyer = "buyer",
    farmer = "farmer"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    changeUserRole(user: Principal, newUserType: UserType): Promise<void>;
    createAdminAccount(user: Principal, email: string, passwordHash: string, name: string | null): Promise<void>;
    deleteUserAccount(user: Principal): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    isCallerBuyer(): Promise<boolean>;
    isCallerFarmer(): Promise<boolean>;
    listAllUsers(): Promise<Array<[Principal, UserProfile]>>;
    registerBuyer(email: string, passwordHash: string, name: string | null): Promise<void>;
    registerFarmer(email: string, passwordHash: string, name: string | null): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
}
