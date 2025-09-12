import { IMentorRepository } from "../../../domain/interfaces/IMentorRepository";
import {
  MentorMapper,
  MentorResponseDto,
} from "../../../domain/zodSchemaDto/output/mentorResponse.dto";
import { IAdminFetchVerifyProfilesUseCase } from "../../interface/admin/IAdminFetchVerifyProfiles";

export class AdminFetchVerifyProfilesUseCase
  implements IAdminFetchVerifyProfilesUseCase
{
  constructor(private _mentorRepository: IMentorRepository) {}

  async execute(
    pageNum: number,
    searchData: string,
    verified: "verified" | "applicationPending" | "all" | "verificationPending"
  ): Promise<{ datas: MentorResponseDto[]; totalPages: number } | null> {
    const result = await this._mentorRepository.find(
      pageNum,
      verified,
      searchData
    );
    if (!result) return null;
    const mappedDatas: MentorResponseDto[] = result.datas.map((mentor) =>
      MentorMapper.toDto(mentor)
    );
    return { datas: mappedDatas, totalPages: result.totalPages };
  }
}
