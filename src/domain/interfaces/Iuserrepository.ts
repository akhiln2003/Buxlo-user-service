import { IuserUpdateData } from "../../application/interface/user/IupdateUserProfileUseCase";
import { UserResponseDto } from "../../zodSchemaDto/output/userResponse.dto";
import { User } from "../entities/user";

export interface IuserRepository {
  create(user: User): Promise<UserResponseDto>;
  updateUserProfile(
    userId: string,
    query: IuserUpdateData
  ): Promise<UserResponseDto>;
  getUserDetails(userId: string): Promise<UserResponseDto | null>;
  updateUserProfileData(
    userId: string,
    data: { name?: string; avatar?: string }
  ): Promise<UserResponseDto>;
  deleteUserProfileData(
    userId: string,
    data: { avatar?: string }
  ): Promise<UserResponseDto>;
}
