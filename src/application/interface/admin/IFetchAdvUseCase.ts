import { Adv } from "../../../domain/entities/adv";

export interface IFetchAdvUseCase{
    execute(page:number): Promise< {advs: Adv[]; totalPages: number } | null>;
  }