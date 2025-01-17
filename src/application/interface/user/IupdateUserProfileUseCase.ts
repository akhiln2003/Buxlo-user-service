import { User } from "../../../domain/entities/user";

export interface IuserUpdateData {
  name?: string;
  avatar?: string;
}

export interface IupdateUserProfileUseCase {
  execute(
    id: string,
    updatedData: IuserUpdateData,
    file: any,
    currentProfileImage: string | undefined
  ): Promise<any | User>;
}
