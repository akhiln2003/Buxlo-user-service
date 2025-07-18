import { Mentor } from "../../../domain/entities/mentor";
import { ImentorRepository } from "../../../domain/interfaces/ImentorRepository";
import { IfetchMentorsUseCase } from "../../interface/user/IfetchMentorsUseCase";
export class FetchMentorsUseCase implements IfetchMentorsUseCase {
  constructor(private mentorRepository: ImentorRepository) {}

  async execute(
    page: number,
    experience: string,
    rating: string,
    salary: string,
    searchData: string
  ): Promise<{ datas: Mentor[]; totalPages: number } | null> {
    try {
      return await this.mentorRepository.fetchAll(
        page,
        experience,
        rating,
        salary,
        searchData
      );
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
