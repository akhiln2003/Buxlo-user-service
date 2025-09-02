import { TrustedUs } from "../../../domain/entities/trustedUs";

export interface IFetchtrustedUsUseCase{
    execute(page:number): Promise<{ trustedUs: TrustedUs[]; totalPages: number } | null>;
  }