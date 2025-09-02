import { UserResponseDto } from "../../../domain/zodSchemaDto/output/userResponse.dto";

export interface IUserUpdateData {
  name?: string;
  avatar?: string;
}

export interface IUpdateUserProfileUseCase {
  execute(
    id: string,
    updatedData: IUserUpdateData,
    file: any,
    currentProfileImage: string | undefined
  ): Promise<UserResponseDto>;
}
