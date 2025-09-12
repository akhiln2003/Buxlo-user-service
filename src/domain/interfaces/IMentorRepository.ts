import { IMentorUpdateData } from "../../application/interface/mentor/IUpdateMentorProfileUseCase";
import { Mentor } from "../entities/mentor.entity";

export interface IMentorRepository {
  updateMentorProfile(
    userId: string,
    query: IMentorUpdateData
  ): Promise<Mentor>;
  getMentorDetails(userId: string): Promise<Mentor | null>;
  updateMentorProfileData(
    userId: string,
    data: { name?: string; avatar?: string }
  ): Promise<Mentor>;
  deleteMentorProfileData(
    userId: string,
    data: { avatar?: string }
  ): Promise<Mentor>;
  applyProfileVerification(
    id: string,
    data: {
      aadhaarFrontImage: string;
      aadhaarBackImage: string;
      aadhaarName: string;
      aadhaarNumber: string;
    }
  ): Promise<Mentor>;
  verifyProfile(
    id: string,
    verified: "verified" | "applicationPending",
    unsetData?: {
      aadhaarFrontImage: string;
      aadhaarBackImage: string;
      aadhaarName: string;
      aadhaarNumber: string;
    }
  ): Promise<Mentor>;
  find(
    page: number,
    verified: "verified" | "applicationPending" | "all" | "verificationPending",
    searchData?: string | undefined
  ): Promise<{ datas: Mentor[]; totalPages: number } | null>;
  fetchAll(
    page: number,
    experience: string,
    rating: string,
    searchData: string
  ): Promise<{ datas: Mentor[]; totalPages: number } | null>;
}
