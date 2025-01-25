import { Adv } from "../../../domain/entities/adv";

export interface IdeleteAdvImageUseCase {
  execute(key: string, id: string): Promise<Adv | any>;
}