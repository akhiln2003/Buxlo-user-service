import { MentorResponseDto } from "../../dto/mentorResponse.dto";

export interface IMentorUpdateData {
  name?: string;
  bio?: string;
  expertise?: string;
  yearsOfExperience?: number;
  avatar?: string;
}

export interface IUpdateMentorProfileUseCase {
  execute(
    id: string,
    updatedData: IMentorUpdateData,
    file: any,
    currentProfileImage: string | undefined
  ): Promise<MentorResponseDto>;
}
