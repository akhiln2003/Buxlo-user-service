import { UserResponseDto } from "../../../domain/zodSchemaDto/output/userResponse.dto";

export interface IfetchUserProfileUseCase {
  execute(id: string): Promise<UserResponseDto>;
}
