import { BadRequest, InternalServerError } from "@buxlo/common";
import { ImentorUpdateData } from "../../application/interface/mentor/IupdateMentorProfileUseCase";
import { ImentorRepository } from "../../domain/interfaces/ImentorRepository";
import { MentorProfile } from "../database/mongodb/schema/mentor.schema";
import {
  MentorMapper,
  MentorResponseDto,
} from "../../zodSchemaDto/output/mentorResponse.dto";

export class MentorRepository implements ImentorRepository {
  async create({
    id,
    email,
    name,
    role,
    isGoogle,
    avatar,
    yearsOfExperience,
  }: {
    id: string;
    email: string;
    name: string;
    role: string;
    isGoogle: boolean;
    avatar: string;
    yearsOfExperience: number;
  }): Promise<MentorResponseDto> {
    try {
      const newUser = MentorProfile.build({
        _id: id,
        name,
        email,
        role,
        isGoogle,
        avatar,
        yearsOfExperience,
      });
      const saved = await newUser.save();
      return MentorMapper.toDto(saved);
    } catch (error: any) {
      throw new BadRequest(`Failed to create mentor: ${error.message}`);
    }
  }
  async updateMentorProfile(
    userId: string,
    query: ImentorUpdateData
  ): Promise<MentorResponseDto> {
    try {
      const updatedProfile = await MentorProfile.findOneAndUpdate(
        { _id: userId },
        { $set: query },
        { new: true }
      );

      return MentorMapper.toDto(updatedProfile);
    } catch (error: any) {
      throw new BadRequest(`Failed to update mentorProfile: ${error.message}`);
    }
  }
  async getMentorDetails(userId: string): Promise<MentorResponseDto | null> {
    try {
      const mentorDetails = await MentorProfile.findById(userId);
      return mentorDetails ? MentorMapper.toDto(mentorDetails) : null;
    } catch (error: any) {
      throw new BadRequest(`Failed to get mentorDetails: ${error.message}`);
    }
  }

  async updateMentorProfileData(
    userId: string,
    data: { name?: string; avatar?: string }
  ): Promise<MentorResponseDto> {
    try {
      const updatedUser = await MentorProfile.findByIdAndUpdate(
        userId,
        { $set: data },
        { new: true }
      );
      return MentorMapper.toDto(updatedUser);
    } catch (error: any) {
      throw new Error(`db error to update mentor: ${error.message}`);
    }
  }

  async deleteMentorProfileData(
    userId: string,
    data: { avatar?: string }
  ): Promise<MentorResponseDto> {
    try {
      const updatedUser = await MentorProfile.findByIdAndUpdate(
        userId,
        { $unset: data },
        { new: true }
      );
      if (!updatedUser) throw new BadRequest("Faild to delete mentor");
      return MentorMapper.toDto(updatedUser);
    } catch (error: any) {
      throw new BadRequest(
        `Failed to delete mentorProfileData: ${error.message}`
      );
    }
  }

  async applyProfileVerification(
    id: string,
    data: {
      aadhaarFrontImage: string;
      aadhaarBackImage: string;
      aadhaarName: string;
      aadhaarNumber: string;
    }
  ): Promise<MentorResponseDto> {
    try {
      const updatedUser = await MentorProfile.findByIdAndUpdate(
        id,
        { $set: data },
        { new: true }
      );
      return MentorMapper.toDto(updatedUser);
    } catch (error: any) {
      throw new BadRequest(
        `Failed to applyProfileVerification: ${error.message}`
      );
    }
  }
  async verifyProfile(
    id: string,
    verified: "verified" | "applicationPending",
    unsetData?: {
      aadhaarFrontImage?: string;
      aadhaarBackImage?: string;
      aadhaarName?: string;
      aadhaarNumber?: string;
    }
  ): Promise<MentorResponseDto> {
    try {
      const updateData: any = {};
      updateData.verified = verified;
      if (verified === "applicationPending" && unsetData) {
        updateData.$unset = {};
        if (unsetData.aadhaarFrontImage) {
          updateData.$unset.aadhaarFrontImage = "";
        }
        if (unsetData.aadhaarBackImage) {
          updateData.$unset.aadhaarBackImage = "";
        }
        if (unsetData.aadhaarName) {
          updateData.$unset.aadhaarName = "";
        }
        if (unsetData.aadhaarNumber) {
          updateData.$unset.aadhaarNumber = "";
        }
      }
      const updatedUser = await MentorProfile.findByIdAndUpdate(
        id,
        {
          $set: { verified: updateData.verified },
          ...(updateData.$unset ? { $unset: updateData.$unset } : {}),
        },
        { new: true }
      );
      return MentorMapper.toDto(updatedUser);
    } catch (error: any) {
      throw new BadRequest(`Failed to verifyProfile: ${error.message}`);
    }
  }

  async find(
    page: number = 1,
    verified: "verified" | "applicationPending" | "all" | "verificationPending",
    searchData?: string
  ): Promise<{ datas: MentorResponseDto[]; totalPages: number } | null> {
    const limit = 10,
      skip = (page - 1) * limit,
      filter: any = {};

    if (searchData && searchData !== "undefined") {
      filter.$or = [
        { name: { $regex: searchData, $options: "i" } },
        { email: { $regex: searchData, $options: "i" } },
      ];
    }
    if (verified !== "all") {
      filter.verified = verified;
    }
    const totalCount = await MentorProfile.countDocuments(filter);
    const totalPages = Math.ceil(totalCount / limit);
    const mentors = await MentorProfile.find(filter).skip(skip).limit(limit);
    const datas = mentors.map((mentor) => MentorMapper.toDto(mentor));

    return { datas, totalPages };
  }
  async fetchAll(
    page: number,
    experience: string,
    rating: string,
    searchData: string
  ): Promise<{ datas: MentorResponseDto[]; totalPages: number } | null> {
    try {
      const limit = 10,
        skip = (page - 1) * limit,
        filter: any = {};

      filter.verified = "verified";
      if (searchData) {
        filter.$or = [
          { name: { $regex: `^${searchData}`, $options: "i" } },
          { email: { $regex: `^${searchData}`, $options: "i" } },
        ];
      }

      if (experience) {
        if (experience.includes("-")) {
          const [min, max] = experience.split("-").map(Number);
          if (!isNaN(min) && !isNaN(max)) {
            filter.yearsOfExperience = { $gte: min, $lte: max };
          }
        } else {
          const min = Number(experience);
          if (!isNaN(min)) {
            filter.yearsOfExperience = { $gte: min };
          }
        }
      }

      if (rating) {
        filter.rating = rating;
      }

      const totalCount = await MentorProfile.countDocuments(filter);
      const totalPages = Math.ceil(totalCount / limit);
      const mentors = await MentorProfile.find(filter).skip(skip).limit(limit);
      const datas = mentors.map((mentor) => MentorMapper.toDto(mentor));

      return { datas, totalPages };
    } catch (error: any) {
      console.error("Error form fetch All mentors : ", error.message);
      throw new InternalServerError();
    }
  }
}
