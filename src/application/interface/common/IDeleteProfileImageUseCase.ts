import { MentorResponseDto } from "../../dto/mentorResponse.dto";
import { UserResponseDto } from "../../dto/userResponse.dto";

export interface IDeleteMentorProfileImageUseCase {
  execute(key: string, id: string): Promise<MentorResponseDto>;
}

export interface IDeleteUserProfileImageUseCase {
  execute(key: string, id: string): Promise<UserResponseDto>;
}
