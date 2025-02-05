import { Mentor } from "../../../domain/entities/mentor";
import { ImentorRepository } from "../../../domain/interfaces/ImentorRepository";
import { IadminFetchVerifyProfilesUseCase } from "../../interface/admin/IadminFetchVerifyProfiles";

export class AdminFetchVerifyProfilesUseCase
  implements IadminFetchVerifyProfilesUseCase
{
  constructor(private mentorRepository: ImentorRepository) {}

  async execute(
    pageNum: number,
    searchData:string,
    verified:"verified" | "applicationPending" | "all" | "verificationPending"
  ): Promise<{ datas: Mentor[]; totalPages: number } | null> {
    return this.mentorRepository.find(pageNum , verified ,searchData );
  }
}
