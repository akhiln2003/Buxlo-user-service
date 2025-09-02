import { UserResponseDto } from "../../../domain/zodSchemaDto/output/userResponse.dto";

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
  ): Promise<UserResponseDto>;
}
