import { MentorResponseDto } from "../../dto/mentorResponse.dto";

export interface IFetchMentorsUseCase {
  execute(
    page: number,
    experience: string,
    raiting: string,
    searchData: string
  ): Promise<{ datas: MentorResponseDto[]; totalPages: number } | null>;
}
