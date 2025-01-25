import { TrustedUs } from "../../../domain/entities/trustedUs";
import { ItrustedUsRepository } from "../../../domain/interfaces/ItrustedUsRepository";
import { IfetchtrustedUsUseCase } from "../../interface/admin/IfetchtrustedUsUseCase";

export class FetchtrustedUsUseCase implements IfetchtrustedUsUseCase {
  constructor(private trustedUsRepository: ItrustedUsRepository) {}

  async execute(): Promise<TrustedUs[] | null> {
    return await this.trustedUsRepository.getTrustedUsDetails();
  }
}
