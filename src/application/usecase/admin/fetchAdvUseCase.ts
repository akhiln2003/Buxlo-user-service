import { Adv } from "../../../domain/entities/adv";
import { IAdvRepository } from "../../../domain/interfaces/IAdvRepository";
import { IFetchAdvUseCase } from "../../interface/admin/IFetchAdvUseCase";

export class FetchAdvUseCase implements IFetchAdvUseCase {
  constructor(private _advRepository: IAdvRepository) {}

  async execute(
    page: number
  ): Promise<{ advs: Adv[]; totalPages: number } | null> {
    return await this._advRepository.getAdvDetails(page);
  }
}
