import { TrustedUs } from "../../../domain/entities/trustedUs";
import { ItrustedUsRepository } from "../../../domain/interfaces/ItrustedUsRepository";
import { IfetchtrustedUsUseCase } from "../../interface/admin/IfetchtrustedUsUseCase";

export class FetchtrustedUsUseCase implements IfetchtrustedUsUseCase {
  constructor(private _trustedUsRepository: ItrustedUsRepository) {}

  async execute(page:number): Promise<{ trustedUs: TrustedUs[]; totalPages: number } | null> {
    return await this._trustedUsRepository.getTrustedUsDetails(page);
  }
}
