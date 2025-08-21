import { ImentorRepository } from "../../../domain/interfaces/ImentorRepository";
import { MentorResponseDto } from "../../../zodSchemaDto/output/mentorResponse.dto";
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
      return await this._mentorRepository.fetchAll(
        page,
        experience,
        rating,
        searchData
      );
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
