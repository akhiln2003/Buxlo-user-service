import { MentorResponseDto } from "../../../zodSchemaDto/output/mentorResponse.dto";
import { UserResponseDto } from "../../../zodSchemaDto/output/userResponse.dto";

export interface IdeleteMentorProfileImageUseCase {
  execute(key: string, id: string): Promise<MentorResponseDto>;
}



export interface IdeleteUserProfileImageUseCase {
  execute(key: string, id: string): Promise<UserResponseDto>;
}