import { BadRequest, InternalServerError } from "@buxlo/common";
import { IMentorUpdateData } from "../../application/interface/mentor/IUpdateMentorProfileUseCase";
import { IMentorRepository } from "../../domain/interfaces/IMentorRepository";
import { MentorProfile } from "../database/mongodb/schema/mentor.schema";
import { Mentor } from "../../domain/entities/mentor";

export class MentorRepository implements IMentorRepository {
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
        verified: "applicationPending",
      });
      return await newUser.save();
    } catch (error: any) {
      throw new BadRequest(`Failed to create mentor: ${error.message}`);
    }
  }
  async updateMentorProfile(
    userId: string,
    query: IMentorUpdateData
  ): Promise<Mentor> {
    try {
      const updatedProfile = await MentorProfile.findOneAndUpdate(
        { _id: userId },
        { $set: query },
        { new: true }
      );
      if (!updatedProfile)
        throw new BadRequest("Failed to update mentor profile");
      return updatedProfile;
    } catch (error: any) {
      throw new BadRequest(`Failed to update mentorProfile: ${error.message}`);
    }
  }
  async getMentorDetails(userId: string): Promise<Mentor | null> {
    try {
      const mentorDetails = await MentorProfile.findById(userId);
      return mentorDetails ? mentorDetails : null;
    } catch (error: any) {
      throw new BadRequest(`Failed to get mentorDetails: ${error.message}`);
    }
  }

  async updateMentorProfileData(
    userId: string,
    data: { name?: string; avatar?: string }
  ): Promise<Mentor> {
    try {
      const updatedUser = await MentorProfile.findByIdAndUpdate(
        userId,
        { $set: data },
        { new: true }
      );
      if (!updatedUser)
        throw new BadRequest("Failed to update mentor profile data");
      return updatedUser;
    } catch (error: any) {
      throw new Error(`db error to update mentor: ${error.message}`);
    }
  }

  async deleteMentorProfileData(
    userId: string,
    data: { avatar?: string }
  ): Promise<Mentor> {
    try {
      const updatedUser = await MentorProfile.findByIdAndUpdate(
        userId,
        { $unset: data },
        { new: true }
      );
      if (!updatedUser) throw new BadRequest("Faild to delete mentor");
      return updatedUser;
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
  ): Promise<Mentor> {
    try {
      const updatedUser = await MentorProfile.findByIdAndUpdate(
        id,
        { $set: data },
        { new: true }
      );
      if (!updatedUser)
        throw new BadRequest("Failed to apply profile verification");
      return updatedUser;
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
  ): Promise<Mentor> {
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

      if (!updatedUser) throw new BadRequest("Failed to verifyProfile");
      return updatedUser;
    } catch (error: any) {
      throw new BadRequest(`Failed to verifyProfile: ${error.message}`);
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
      const datas = await MentorProfile.find(filter).skip(skip).limit(limit);

      return { datas, totalPages };
    } catch (error: any) {
      console.error("Error form fetch All mentors : ", error.message);
      throw new InternalServerError();
    }
  }
}
