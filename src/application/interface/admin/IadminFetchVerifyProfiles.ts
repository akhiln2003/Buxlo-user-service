import { Mentor } from "../../../domain/entities/mentor";

export interface IadminFetchVerifyProfilesUseCase {
  execute(
    pageNum: number,
    searchData:string,
    verified:string
  ): Promise<{ datas: Mentor[]; totalPages: number } | null>;
}
