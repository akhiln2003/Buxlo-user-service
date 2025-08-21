import { MentorResponseDto } from "../../../zodSchemaDto/output/mentorResponse.dto";

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
  ): Promise<MentorResponseDto>;
}
