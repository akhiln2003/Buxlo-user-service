import { MentorResponseDto } from "../../dto/mentorResponse.dto";

export interface IMentorVerifyprofileUseCase {
  execute(
    id: string,
    files: any,
    query: {
      aadhaarName: string;
      aadhaarNumber: string;
      aadhaarFrontImage: string;
      aadhaarBackImage: string;
      verified: "verified" | "applicationPending" | "verificationPending";
    }
  ): Promise<MentorResponseDto>;
}
