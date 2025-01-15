import { User } from "../entities/user";

export interface IuserRepository{
    updateUserProfile(userId: string): Promise<User | null>;
    getUserDetails(userId: string): Promise<User | null>;
    updateUserProfileData(userId: string, data: { name?: string, avatar?: string }): Promise<User | null>;
}