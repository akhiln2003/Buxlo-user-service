import { UserResponseDto } from "../../dto/userResponse.dto";

export interface IFetchUserProfileUseCase {
  execute(id: string): Promise<UserResponseDto>;
}
