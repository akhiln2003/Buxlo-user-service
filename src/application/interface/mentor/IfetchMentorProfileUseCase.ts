import { MentorResponseDto } from "../../../zodSchemaDto/output/mentorResponse.dto";

export interface IfetchMentorProfileUseCase {
  execute(id: string): Promise<MentorResponseDto>;
}
