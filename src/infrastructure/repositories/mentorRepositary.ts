import { InternalServerError } from "@buxlo/common";
import { ImentorUpdateData } from "../../application/interface/mentor/IupdateMentorProfileUseCase";
import { Mentor } from "../../domain/entities/mentor";
import { ImentorRepository } from "../../domain/interfaces/ImentorRepository";
import { MentorProfile } from "../database/mongodb/schema/mentor.schema";

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
  }): Promise<Mentor> {
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
      return await newUser.save();
    } catch (error: any) {
      throw new Error(`db error: ${error.message}`);
    }
  }
  async updateMentorProfile(
    userId: string,
    query: ImentorUpdateData
  ): Promise<Mentor | null> {
    try {
      const updatedProfile = await MentorProfile.findOneAndUpdate(
        { _id: userId },
        { $set: query },
        { new: true }
      );

      return updatedProfile;
    } catch (error: any) {
      throw new Error(`db error: ${error.message}`);
    }
  }
  async getMentorDetails(userId: string): Promise<Mentor | null> {
    try {
      const mentorDetails = await MentorProfile.findById(userId);
      return mentorDetails;
    } catch (error: any) {
      console.error(error);
      throw new Error(`db error to fetch user: ${error.message}`);
    }
  }

  async updateMentorProfileData(
    userId: string,
    data: { name?: string; avatar?: string }
  ): Promise<Mentor | null> {
    try {
      const updatedUser = await MentorProfile.findByIdAndUpdate(
        userId,
        { $set: data },
        { new: true }
      );
      return updatedUser as Mentor | null;
    } catch (error: any) {
      throw new Error(`db error to update user: ${error.message}`);
    }
  }

  async deleteMentorProfileData(
    userId: string,
    data: { avatar?: string }
  ): Promise<Mentor | null> {
    try {
      const updatedUser = await MentorProfile.findByIdAndUpdate(
        userId,
        { $unset: data },
        { new: true }
      );
      return updatedUser;
    } catch (error: any) {
      throw new Error(`db error to update user: ${error.message}`);
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
  ): Promise<Mentor | null> {
    try {
      const updatedUser = await MentorProfile.findByIdAndUpdate(
        id,
        { $set: data },
        { new: true }
      );
      return updatedUser as Mentor | null;
    } catch (error: any) {
      throw new Error(`db error to update user: ${error.message}`);
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
  ): Promise<Mentor | null> {
    try {
      const updateData: any = {};
      // Set verification status
      updateData.verified = verified;
      // If application is pending, prepare unset data
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
      return updatedUser as Mentor | null;
    } catch (error: any) {
      throw new Error(`Database error while updating user: ${error.message}`);
    }
  }

  async find(
    page: number = 1,
    verified: "verified" | "applicationPending" | "all" | "verificationPending",
    searchData?: string
  ): Promise<{ datas: Mentor[]; totalPages: number } | null> {
    const limit = 10,
      skip = (page - 1) * limit,
      filter: any = {};

    // Apply search filter if searchData is provided
    if (searchData && searchData !== "undefined") {
      filter.$or = [
        { name: { $regex: searchData, $options: "i" } },
        { email: { $regex: searchData, $options: "i" } },
      ];
    }
    // Apply verified status filter if not "all"
    if (verified !== "all") {
      filter.verified = verified;
    }
    // Count total documents based on filter
    const totalCount = await MentorProfile.countDocuments(filter);
    const totalPages = Math.ceil(totalCount / limit);
    const datas = await MentorProfile.find(filter).skip(skip).limit(limit);
    return { datas, totalPages };
  }
  async fetchAll(
    page: number,
    experience: string,
    rating: string,
    searchData: string
  ): Promise<{ datas: Mentor[]; totalPages: number } | null> {
    try {
      const limit = 10,
        skip = (page - 1) * limit,
        filter: any = {};

      // apply verified filter
      filter.verified = "verified";
      // Apply search filter
      if (searchData) {
        filter.$or = [
          { name: { $regex: `^${searchData}`, $options: "i" } },
          { email: { $regex: `^${searchData}`, $options: "i" } },
        ];
      }

      // Apply experience filter
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

      // Apply rating filter
      if (rating) {
        filter.rating = rating;
      }

      
      const totalCount = await MentorProfile.countDocuments(filter);
      const totalPages = Math.ceil(totalCount / limit);
      const datas = await MentorProfile.find(filter).skip(skip).limit(limit);
      return { datas, totalPages };
    } catch (error: any) {
      console.error("Error form fetch All mentors : ", error.message);
      throw new InternalServerError();
    }
  }
}
