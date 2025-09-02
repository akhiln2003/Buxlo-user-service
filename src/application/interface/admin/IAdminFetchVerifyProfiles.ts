import { MentorResponseDto } from "../../../domain/zodSchemaDto/output/mentorResponse.dto";

export interface IAdminFetchVerifyProfilesUseCase {
  execute(
    pageNum: number,
    searchData: string,
    verified: string
  ): Promise<{ datas: MentorResponseDto[]; totalPages: number } | null>;
}
