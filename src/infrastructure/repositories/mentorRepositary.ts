import { User } from "../../domain/entities/user";
import { IuserRepository } from "../../domain/interfaces/Iuserrepository";
import { MentorProfile } from "../database/mongodb/schema/mentor.schema";

export class MentorRepository implements IuserRepository {
  async create({
    id,
    email,
    name,
    role,
    isGoogle,
  }: {
    id: string;
    email: string;
    name: string;
    role: string;
    isGoogle: boolean;
  }): Promise<User> {
    try {
      const newUser = MentorProfile.build({
        _id: id,
        name,
        email,
        role,
        isGoogle,
      });
      return await newUser.save();
    } catch (error:any) {
    //   customLogger.error(`db error: ${error.message }`);
      throw new Error(`db error: ${error.message}`);
    }
  }async updateUserProfile(userId: string): Promise<User | null> {
    try {
        const updatedProfile = await MentorProfile.findOneAndUpdate(
            { _id: userId },
            { role: 'mentor' },
            { new: true }
        );
        return updatedProfile;
    } catch (error: any) {
        // customLogger.error(`db error: ${error.message}`);
        throw new Error(`db error: ${error.message}`);
    }
}
async getUserDetails(userId: string): Promise<User | null> {
    try {
        const userDetails = await MentorProfile.findById(userId).lean();
        return userDetails;
    } catch (error: any) {
        // customLogger.error(`db error to fetch user ${userId}: ${error.message}`);
        throw new Error(`db error to fetch user: ${error.message}`);
    }
}

async updateUserProfileData(userId: string, data: { name?: string; avatar?: string }): Promise<User | null> {
    try {
        const updatedUser = await MentorProfile.findByIdAndUpdate(
            userId,
            { $set: data },
            { new: true }
        );
        return updatedUser as User | null;
    } catch (error: any) {
        // customLogger.error(`db error to update user ${userId}: ${error.message}`);
        throw new Error(`db error to update user: ${error.message}`);
    }
}
}
