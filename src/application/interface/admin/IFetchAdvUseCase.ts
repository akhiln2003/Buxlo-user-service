import { AdvResponseDto } from "../../dto/adbResponse.dto";

export interface IFetchAdvUseCase{
    execute(page:number): Promise< {advs: AdvResponseDto[]; totalPages: number } | null>;
  }