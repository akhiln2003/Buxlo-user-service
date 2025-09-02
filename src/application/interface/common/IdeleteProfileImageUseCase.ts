import { MentorResponseDto } from "../../../domain/zodSchemaDto/output/mentorResponse.dto";
import { UserResponseDto } from "../../../domain/zodSchemaDto/output/userResponse.dto";

export interface IdeleteMentorProfileImageUseCase {
  execute(key: string, id: string): Promise<MentorResponseDto>;
}

export interface IdeleteUserProfileImageUseCase {
  execute(key: string, id: string): Promise<UserResponseDto>;
}
