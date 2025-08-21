import { MentorResponseDto } from "../../../zodSchemaDto/output/mentorResponse.dto";

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
  ): Promise<MentorResponseDto>;
}
