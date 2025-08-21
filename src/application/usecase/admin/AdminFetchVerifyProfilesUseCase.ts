import { ImentorRepository } from "../../../domain/interfaces/ImentorRepository";
import { MentorResponseDto } from "../../../zodSchemaDto/output/mentorResponse.dto";
import { IadminFetchVerifyProfilesUseCase } from "../../interface/admin/IadminFetchVerifyProfiles";

export class AdminFetchVerifyProfilesUseCase
  implements IadminFetchVerifyProfilesUseCase
{
  constructor(private _mentorRepository: ImentorRepository) {}

  async execute(
    pageNum: number,
    searchData:string,
    verified:"verified" | "applicationPending" | "all" | "verificationPending"
  ): Promise<{ datas: MentorResponseDto[]; totalPages: number } | null> {
    return this._mentorRepository.find(pageNum , verified ,searchData );
  }
}
