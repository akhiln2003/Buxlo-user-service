import { TrustedUsResponseDto } from "../../../domain/zodSchemaDto/output/trustedUsResponse.dto";

export interface ICreateTurstedUsUsecase{
  execute(file: any): Promise<TrustedUsResponseDto>;
}