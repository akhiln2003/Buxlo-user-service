import { Adv } from "../../../domain/entities/adv";

export interface IDeleteAdvUseCase {
  execute(key: string, id: string): Promise<Adv | any>;
}