import { ImentorRepository } from "../../../domain/interfaces/ImentorRepository";
import {
  MentorMapper,
  MentorResponseDto,
} from "../../../domain/zodSchemaDto/output/mentorResponse.dto";
import { IadminFetchVerifyProfilesUseCase } from "../../interface/admin/IadminFetchVerifyProfiles";

export class AdminFetchVerifyProfilesUseCase
  implements IadminFetchVerifyProfilesUseCase
{
  constructor(private _mentorRepository: ImentorRepository) {}

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
