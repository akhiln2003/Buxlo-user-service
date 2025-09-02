import { UserResponseDto } from "../../../domain/zodSchemaDto/output/userResponse.dto";

export interface IFetchUserProfileUseCase {
  execute(id: string): Promise<UserResponseDto>;
}
