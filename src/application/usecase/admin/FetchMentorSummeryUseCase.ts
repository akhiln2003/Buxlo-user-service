import { IMentorRepository } from "../../../domain/interfaces/IMentorRepository";
import { IFetchMentorSummeryUseCase, IMentorGrowth } from "../../interface/admin/IFetchMentorSummeryUseCase";

export class FetchMentorSummeryUseCase implements IFetchMentorSummeryUseCase {
  constructor(private _mentorRepository: IMentorRepository) {}

  async execute(): Promise<{ totalUsers: number; userGrowth: IMentorGrowth[] }> {
    return await this._mentorRepository.getMentorSummery();
  }
}
