import { MentorResponseDto } from "../../../domain/zodSchemaDto/output/mentorResponse.dto";
import { UserResponseDto } from "../../../domain/zodSchemaDto/output/userResponse.dto";

export interface IDeleteMentorProfileImageUseCase {
  execute(key: string, id: string): Promise<MentorResponseDto>;
}

export interface IDeleteUserProfileImageUseCase {
  execute(key: string, id: string): Promise<UserResponseDto>;
}
