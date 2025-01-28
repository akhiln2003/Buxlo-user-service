import { Adv } from "../../../domain/entities/adv";

export interface IdeleteAdvUseCase {
  execute(key: string, id: string): Promise<Adv | any>;
}