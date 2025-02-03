import { Adv } from "../../../domain/entities/adv";

export interface IfetchAdvUseCase{
    execute(page:number): Promise< {advs: Adv[]; totalPages: number } | null>;
  }