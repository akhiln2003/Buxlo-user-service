import { BadRequest } from "@buxlo/common";
import { IuserUpdateData } from "../../application/interface/user/IupdateUserProfileUseCase";
import { IuserRepository } from "../../domain/interfaces/Iuserrepository";
import {
  UserMapper,
  UserResponseDto,
} from "../../zodSchemaDto/output/userResponse.dto";
import { UserProfile } from "../database/mongodb/schema/user.schema";

export class UserRepository implements IuserRepository {
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
  }): Promise<UserResponseDto> {
    try {
      const newUser = UserProfile.build({
        _id: id,
        name,
        email,
        role,
        isGoogle,
        avatar,
      });
      const saved = await newUser.save();
      return UserMapper.toDto(saved);
    } catch (error: any) {
      //   customLogger.error(`db error: ${error.message }`);
      throw new BadRequest(`Failed to create user: ${error.message}`);
    }
  }
  async updateUserProfile(
    userId: string,
    query: IuserUpdateData
  ): Promise<UserResponseDto> {
    try {
      const updatedProfile = await UserProfile.findOneAndUpdate(
        { _id: userId },
        {
          $set: query,
        },
        { new: true }
      );
      if (!updatedProfile) throw new BadRequest("User not found");
      return UserMapper.toDto(updatedProfile);
    } catch (error: any) {
      // customLogger.error(`db error: ${error.message}`);
      throw new BadRequest(`Failed to update userProfile: ${error.message}`);
    }
  }
  async getUserDetails(userId: string): Promise<UserResponseDto | null> {
    try {
      const userDetails = await UserProfile.findById(userId);
        return userDetails ? UserMapper.toDto(userDetails) : null;

    } catch (error: any) {
      throw new BadRequest(`Failed to get userDetails: ${error.message}`);
    }
  }

  async updateUserProfileData(
    userId: string,
    data: { name?: string; avatar?: string }
  ): Promise<UserResponseDto> {
    try {
      const updatedUser = await UserProfile.findByIdAndUpdate(
        userId,
        { $set: data },
        { new: true }
      );
      return UserMapper.toDto(updatedUser);
    } catch (error: any) {
      // customLogger.error(`db error to update user ${userId}: ${error.message}`);
      throw new BadRequest(
        `Failed to update userProfileData: ${error.message}`
      );
    }
  }

  async deleteUserProfileData(
    userId: string,
    data: { avatar?: string }
  ): Promise<UserResponseDto> {
    try {
      const updatedUser = await UserProfile.findByIdAndUpdate(
        userId,
        { $unset: data },
        { new: true }
      );
      return UserMapper.toDto(updatedUser);
    } catch (error: any) {
      throw new BadRequest(
        `Failed to delete userProfileData: ${error.message}`
      );
    }
  }
}
