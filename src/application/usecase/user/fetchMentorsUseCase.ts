import { ImentorRepository } from "../../../domain/interfaces/ImentorRepository";
import {
  MentorMapper,
  MentorResponseDto,
} from "../../../domain/zodSchemaDto/output/mentorResponse.dto";
import { IfetchMentorsUseCase } from "../../interface/user/IfetchMentorsUseCase";
export class FetchMentorsUseCase implements IfetchMentorsUseCase {
  constructor(private _mentorRepository: ImentorRepository) {}

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
