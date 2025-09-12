import { AdvResponseDto } from "../../../domain/zodSchemaDto/output/adbResponse.dto";

export interface IFetchAdvUseCase{
    execute(page:number): Promise< {advs: AdvResponseDto[]; totalPages: number } | null>;
  }