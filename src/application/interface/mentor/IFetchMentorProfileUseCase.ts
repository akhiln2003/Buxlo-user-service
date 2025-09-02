import { MentorResponseDto } from "../../../domain/zodSchemaDto/output/mentorResponse.dto";

export interface IFetchMentorProfileUseCase {
  execute(id: string): Promise<MentorResponseDto>;
}
