import { BadRequest } from "@buxlo/common";
import { IUserUpdateData } from "../../application/interface/user/IUpdateUserProfileUseCase";
import { IUserRepository } from "../../domain/interfaces/IUserrepository";
import { UserProfile } from "../database/mongodb/schema/user.schema";
import { User } from "../../domain/entities/user.entity";

export class UserRepository implements IUserRepository {
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
  }): Promise<User> {
    try {
      const newUser = UserProfile.build({
        _id: id,
        name,
        email,
        role,
        isGoogle,
        avatar,
      });
      return await newUser.save();
    } catch (error: any) {
      throw new BadRequest(`Failed to create user: ${error.message}`);
    }
  }
  async updateUserProfile(
    userId: string,
    query: IUserUpdateData
  ): Promise<User> {
    try {
      const updatedProfile = await UserProfile.findOneAndUpdate(
        { _id: userId },
        {
          $set: query,
        },
        { new: true }
      );
      if (!updatedProfile) throw new BadRequest("User not found");
      return updatedProfile;
    } catch (error: any) {
      throw new BadRequest(`Failed to update userProfile: ${error.message}`);
    }
  }
  async getUserDetails(userId: string): Promise<User | null> {
    try {
      const userDetails = await UserProfile.findById(userId);
      return userDetails ? userDetails : null;
    } catch (error: any) {
      throw new BadRequest(`Failed to get userDetails: ${error.message}`);
    }
  }

  async updateUserProfileData(
    userId: string,
    data: {
      name?: string;
      avatar?: string;
      premiumId?: string;
      premiumEndDate?: string;
    }
  ): Promise<User> {
    try {
      const updatedUser = await UserProfile.findByIdAndUpdate(
        userId,
        { $set: data },
        { new: true }
      );

      if (!updatedUser) throw new BadRequest("Failed to update userDetails");
      return updatedUser;
    } catch (error: any) {
      throw new BadRequest(
        `Failed to update userProfileData: ${error.message}`
      );
    }
  }

  async deleteUserProfileData(
    userId: string,
    data: { avatar?: string }
  ): Promise<User> {
    try {
      const updatedUser = await UserProfile.findByIdAndUpdate(
        userId,
        { $unset: data },
        { new: true }
      );

      if (!updatedUser) throw new BadRequest("Failed to delete userDetails");
      return updatedUser;
    } catch (error: any) {
      throw new BadRequest(
        `Failed to delete userProfileData: ${error.message}`
      );
    }
  }

  async findExpiredPremiumUsers(date: Date): Promise<User[]> {
    try {
      return await UserProfile.find({
        premium: true,
        premiumExpiry: { $lt: date },
      });
    } catch (error: any) {
      throw new BadRequest(
        `Failed to delete userProfileData: ${error.message}`
      );
    }
  }
  async updatePremiumStatus(userId: string): Promise<User> {
    try {
      const updatedUser = await UserProfile.findByIdAndUpdate(
        userId,
        { $unset: { premiumId: 1, premiumEndDate: 1 } },
        { new: true }
      );
      if (!updatedUser) throw new BadRequest("Failed to remove premiumStatus");
      return updatedUser;
    } catch (error: any) {
      throw new BadRequest(
        `Failed to delete userProfileData: ${error.message}`
      );
    }
  }
}
