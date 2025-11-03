import { IUserUpdateData } from "../../application/interface/user/IUpdateUserProfileUseCase";
import { User } from "../entities/user.entity";

export interface IUserRepository {
  create(user: User): Promise<User>;
  updateUserProfile(userId: string, query: IUserUpdateData): Promise<User>;
  getUserDetails(userId: string): Promise<User | null>;
  updateUserProfileData(
    userId: string,
    data: {
      name?: string;
      avatar?: string;
      premiumId?: string;
      premiumEndDate?: string;
    }
  ): Promise<User>;
  deleteUserProfileData(
    userId: string,
    data: { avatar?: string }
  ): Promise<User>;
  findExpiredPremiumUsers(date: Date): Promise<User[]>;
  updatePremiumStatus(userId: string): Promise<User>;
  getUserSummery():Promise<{ totalUsers: number; userGrowth:{ month: string; count: number }[]  }>
}
