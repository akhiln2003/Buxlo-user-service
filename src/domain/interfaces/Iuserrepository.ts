import { IuserUpdateData } from "../../application/interface/user/IupdateUserProfileUseCase";
import { User } from "../entities/user";

export interface IuserRepository {
  updateUserProfile(userId: string ,  query:IuserUpdateData): Promise<User | null>;
  getUserDetails(userId: string): Promise<User | null>;
  updateUserProfileData(
    userId: string,
    data: { name?: string; avatar?: string }
  ): Promise<User | null>;
  deleteUserProfileData(
    userId: string,
    data: { avatar?: string }
  ): Promise<User | null>;
}
