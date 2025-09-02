import { MentorResponseDto } from "../../../domain/zodSchemaDto/output/mentorResponse.dto";

export interface IfetchMentorProfileUseCase {
  execute(id: string): Promise<MentorResponseDto>;
}
