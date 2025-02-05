import { Mentor } from "../../../domain/entities/mentor";

export interface IadminVerifyprofileUseCase {
  execute(
    id: string,
    verified: "verified" | "applicationPending",
    unsetData?: {
      aadhaarFrontImage: string;
      aadhaarBackImage: string;
      aadhaarName: string;
      aadhaarNumber: string;
    }
  ): Promise<Mentor | any>;
}
