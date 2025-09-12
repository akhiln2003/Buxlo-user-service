import { IMentorRepository } from "../../../domain/interfaces/IMentorRepository";
import {
  MentorMapper,
  MentorResponseDto,
} from "../../../domain/zodSchemaDto/output/mentorResponse.dto";
import { IFetchMentorsUseCase } from "../../interface/user/IFetchMentorsUseCase";
export class FetchMentorsUseCase implements IFetchMentorsUseCase {
  constructor(private _mentorRepository: IMentorRepository) {}

  async execute(
    page: number,
    experience: string,
    rating: string,
    searchData: string
  ): Promise<{ datas: MentorResponseDto[]; totalPages: number } | null> {
    try {
      const result = await this._mentorRepository.fetchAll(
        page,
        experience,
        rating,
        searchData
      );
      if (!result) return null;

      const mappedDatas: MentorResponseDto[] = result.datas.map((mentor) =>
        MentorMapper.toDto(mentor)
      );
      return { datas: mappedDatas, totalPages: result.totalPages };
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
