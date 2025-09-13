import { ITrustedUsRepository } from "../../../domain/interfaces/ITrustedUsRepository";
import {
  TrustedUsMapper,
  TrustedUsResponseDto,
} from "../../dto/trustedUsResponse.dto";
import { IFetchtrustedUsUseCase } from "../../interface/admin/IFetchtrustedUsUseCase";

export class FetchtrustedUsUseCase implements IFetchtrustedUsUseCase {
  constructor(private _trustedUsRepository: ITrustedUsRepository) {}

  async execute(
    page: number
  ): Promise<{ trustedUs: TrustedUsResponseDto[]; totalPages: number } | null> {
    const data = await this._trustedUsRepository.getTrustedUsDetails(page);
    const trustedUs = data?.trustedUs
      ? data.trustedUs.map((data) => TrustedUsMapper.toDto(data))
      : [];
    return { trustedUs, totalPages: data?.totalPages as number };
  }
}
