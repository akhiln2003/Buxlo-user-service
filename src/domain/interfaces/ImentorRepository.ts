import { Mentor } from "../entities/mentor";

export interface IuserRepository{
    updateUserProfile(userId: string): Promise<Mentor | null>;
    getUserDetails(userId: string): Promise<Mentor | null>;

    updateUserProfileData(userId: string, data: { name?: string, avatar?: string }): Promise<Mentor | null>;
}