import { TrustedUs } from "../../../domain/entities/trustedUs";
import { ITrustedUsRepository } from "../../../domain/interfaces/ITrustedUsRepository";
import { IFetchtrustedUsUseCase } from "../../interface/admin/IFetchtrustedUsUseCase";

export class FetchtrustedUsUseCase implements IFetchtrustedUsUseCase {
  constructor(private _trustedUsRepository: ITrustedUsRepository) {}

  async execute(
    page: number
  ): Promise<{ trustedUs: TrustedUs[]; totalPages: number } | null> {
    return await this._trustedUsRepository.getTrustedUsDetails(page);
  }
}
