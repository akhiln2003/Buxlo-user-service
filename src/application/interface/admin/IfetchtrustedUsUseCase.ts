import { TrustedUs } from "../../../domain/entities/trustedUs";

export interface IfetchtrustedUsUseCase{
    execute(): Promise<TrustedUs[]| null>;
  }