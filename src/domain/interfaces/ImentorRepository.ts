import { ImentorUpdateData } from "../../application/interface/mentor/IupdateMentorProfileUseCase";
import { Mentor } from "../entities/mentor";

export interface ImentorRepository {
  updateMentorProfile(
    userId: string,
    query: ImentorUpdateData
  ): Promise<Mentor | null>;
  getMentorDetails(userId: string): Promise<Mentor | null>;
  updateMentorProfileData(
    userId: string,
    data: { name?: string; avatar?: string }
  ): Promise<Mentor | null>;
  deleteMentorProfileData(
    userId: string,
    data: { avatar?: string }
  ): Promise<Mentor | null>;
  applyProfileVerification(
    id: string,
    data: {
      aadhaarFrontImage: string;
      aadhaarBackImage: string;
      aadhaarName: string;
      aadhaarNumber: string;
    }
  ): Promise<Mentor | null>;
  verifyProfile(
    id: string,
    verified: "verified" | "applicationPending",
    unsetData?: {
      aadhaarFrontImage: string;
      aadhaarBackImage: string;
      aadhaarName: string;
      aadhaarNumber: string;
    }
  ): Promise<Mentor | null>;
  find(
    page: number,
    verified: "verified" | "applicationPending" | "all" | "verificationPending",
    searchData?: string | undefined
  ): Promise<{ datas: Mentor[]; totalPages: number } | null>;
  fetchAll( page: number,
    availability: "true" | "false" | "all" ,
    searchData?: string): Promise<{ datas: Mentor[]; totalPages: number } | null>;
}
