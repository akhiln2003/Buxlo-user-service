import { Adv } from "../../../domain/entities/adv";
import { IadvRepository } from "../../../domain/interfaces/IadvRepository";
import { IfetchAdvUseCase } from "../../interface/admin/IfetchAdvUseCase";

export class FetchAdvUseCase implements IfetchAdvUseCase {
  constructor(private advRepository: IadvRepository) {}

  async execute(): Promise<Adv[] | null> {
    return await this.advRepository.getAdvDetails();
  }
}
