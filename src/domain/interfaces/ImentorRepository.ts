import { ImentorUpdateData } from "../../application/interface/mentor/IupdateMentorProfileUseCase";
import { MentorResponseDto } from "../../zodSchemaDto/output/mentorResponse.dto";

export interface ImentorRepository {
  updateMentorProfile(
    userId: string,
    query: ImentorUpdateData
  ): Promise<MentorResponseDto>;
  getMentorDetails(userId: string): Promise<MentorResponseDto|null>;
  updateMentorProfileData(
    userId: string,
    data: { name?: string; avatar?: string }
  ): Promise<MentorResponseDto>;
  deleteMentorProfileData(
    userId: string,
    data: { avatar?: string }
  ): Promise<MentorResponseDto>;
  applyProfileVerification(
    id: string,
    data: {
      aadhaarFrontImage: string;
      aadhaarBackImage: string;
      aadhaarName: string;
      aadhaarNumber: string;
    }
  ): Promise<MentorResponseDto>;
  verifyProfile(
    id: string,
    verified: "verified" | "applicationPending",
    unsetData?: {
      aadhaarFrontImage: string;
      aadhaarBackImage: string;
      aadhaarName: string;
      aadhaarNumber: string;
    }
  ): Promise<MentorResponseDto>;
  find(
    page: number,
    verified: "verified" | "applicationPending" | "all" | "verificationPending",
    searchData?: string | undefined
  ): Promise<{ datas: MentorResponseDto[]; totalPages: number } | null>;
  fetchAll(
    page: number,
    experience: string,
    rating: string,
    searchData: string
  ): Promise<{ datas: MentorResponseDto[]; totalPages: number } | null>;
}
