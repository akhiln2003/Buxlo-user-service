import { Adv } from "../../../domain/entities/adv";

export interface IfetchAdvUseCase{
    execute(): Promise<Adv[]| null>;
  }