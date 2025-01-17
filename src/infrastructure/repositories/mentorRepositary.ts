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
  }: {
    id: string;
    email: string;
    name: string;
    role: string;
    isGoogle: boolean;
    avatar: string;
  }): Promise<Mentor> {
    try {
      const newUser = MentorProfile.build({
        _id: id,
        name,
        email,
        role,
        isGoogle,
        avatar,
      });
      return await newUser.save();
    } catch (error: any) {
      //   customLogger.error(`db error: ${error.message }`);
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
        {
          $set: query,
        },
        { new: true }
      );

      return updatedProfile;
    } catch (error: any) {
      // customLogger.error(`db error: ${error.message}`);
      throw new Error(`db error: ${error.message}`);
    }
  }
  async getMentorDetails(userId: string): Promise<Mentor | null> {
    try {
      const mentorDetails = await MentorProfile.findById(userId);
      return mentorDetails;
    } catch (error: any) {
      console.error(error);

      // customLogger.error(`db error to fetch user ${userId}: ${error.message}`);
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
      // customLogger.error(`db error to update user ${userId}: ${error.message}`);
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
}
