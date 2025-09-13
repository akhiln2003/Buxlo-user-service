import { TrustedUsResponseDto } from "../../dto/trustedUsResponse.dto";

export interface ICreateTurstedUsUsecase{
  execute(file: any): Promise<TrustedUsResponseDto>;
}