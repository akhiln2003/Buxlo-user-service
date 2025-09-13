import { TrustedUsResponseDto } from "../../dto/trustedUsResponse.dto";

export interface IFetchtrustedUsUseCase {
  execute(
    page: number
  ): Promise<{ trustedUs: TrustedUsResponseDto[]; totalPages: number } | null>;
}
