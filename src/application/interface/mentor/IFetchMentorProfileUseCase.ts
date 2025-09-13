import { MentorResponseDto } from "../../dto/mentorResponse.dto";

export interface IFetchMentorProfileUseCase {
  execute(id: string): Promise<MentorResponseDto>;
}
