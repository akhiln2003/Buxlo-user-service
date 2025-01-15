import { User } from "../../domain/entities/user";
import { IuserRepository } from "../../domain/interfaces/Iuserrepository";
import { UserProfile } from "../database/mongodb/schema/user.schema";

export class UserRepository implements IuserRepository {
  async create({
    id,
    email,
    name,
    role,
    isGoogle,
    avatar
  }: {
    id: string;
    email: string;
    name: string;
    role: string;
    isGoogle: boolean;
    avatar: string
  }): Promise<User> {
    try {
      const newUser = UserProfile.build({
        _id: id,
        name,
        email,
        role,
        isGoogle,
        avatar
      });
      return await newUser.save();
    } catch (error: any) {
      //   customLogger.error(`db error: ${error.message }`);
      throw new Error(`db error: ${error.message}`);
    }
  }
  async updateUserProfile(userId: string): Promise<User | null> {
    try {
      const updatedProfile = await UserProfile.findOneAndUpdate(
        { _id: userId },
        { role: "mentor" },
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
      const userDetails = await UserProfile.findById(userId).lean();
      return userDetails;
    } catch (error: any) {
      // customLogger.error(`db error to fetch user ${userId}: ${error.message}`);
      throw new Error(`db error to fetch user: ${error.message}`);
    }
  }

  async updateUserProfileData(
    userId: string,
    data: { name?: string; avatar?: string }
  ): Promise<User | null> {
    try {
      const updatedUser = await UserProfile.findByIdAndUpdate(
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
