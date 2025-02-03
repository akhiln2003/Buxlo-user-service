import { TrustedUs } from "../../../domain/entities/trustedUs";

export interface IfetchtrustedUsUseCase{
    execute(page:number): Promise<{ trustedUs: TrustedUs[]; totalPages: number } | null>;
  }