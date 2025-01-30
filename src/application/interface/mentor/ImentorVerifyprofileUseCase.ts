import { Mentor } from "../../../domain/entities/mentor";

export interface ImentorVerifyprofileUseCase {
  execute(
    id: string,
    files: any,
    query: {
      aadhaarName: string;
      aadhaarNumber: string;
      aadhaarFrontImage: string;
      aadhaarBackImage: string;
      verified: "verified"| "applicationPending" | "verificationPending";
      
    }
  ): Promise<any | Mentor>;
}
