import { UserResponseDto } from "../../../zodSchemaDto/output/userResponse.dto";

export interface IfetchUserProfileUseCase{
    execute( id: string ): Promise<UserResponseDto>;
}