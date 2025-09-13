import { MentorResponseDto } from "../../dto/mentorResponse.dto";

export interface IAdminVerifyprofileUseCase {
  execute(
    id: string,
    verified: "verified" | "applicationPending",
    unsetData?: {
      aadhaarFrontImage: string;
      aadhaarBackImage: string;
      aadhaarName: string;
      aadhaarNumber: string;
    }
  ): Promise<MentorResponseDto>;
}
