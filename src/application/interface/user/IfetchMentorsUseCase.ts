import { MentorResponseDto } from "../../../zodSchemaDto/output/mentorResponse.dto";

export interface IfetchMentorsUseCase {
  execute(
    page: number,
    experience: string,
    raiting: string,
    searchData: string
  ): Promise<{ datas: MentorResponseDto[]; totalPages: number } | null>;
}
