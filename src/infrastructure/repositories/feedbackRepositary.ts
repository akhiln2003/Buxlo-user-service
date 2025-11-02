import { BadRequest } from "@buxlo/common";
import { FeedBackSchema } from "../database/mongodb/schema/feedback.schema";
import { IFeedbackRepository } from "../../domain/interfaces/IFeedbackRepository";
import {
  FeedBack,
  PopulatedFeedBack,
} from "../../domain/entities/feedback.entity";
import { Types } from "mongoose";

export class FeedbackRepository implements IFeedbackRepository {
  async create(feedBack: FeedBack): Promise<PopulatedFeedBack> {
    try {
      const newAdv = FeedBackSchema.build(feedBack);
      const savedFeedback = await newAdv.save();

      const populatedFeedback = await FeedBackSchema.findById(savedFeedback._id)
        .populate<{
          userId: {
            _id: Types.ObjectId;
            name: string;
            email: string;
            avatar?: string;
          };
        }>({
          path: "userId",
          select: "name email avatar",
        })
        .lean();

      if (!populatedFeedback)
        throw new BadRequest("Failed to fetch created feedback");

      const result: PopulatedFeedBack = {
        ...populatedFeedback,
        user: {
          id: populatedFeedback.userId?._id?.toString(),
          name: populatedFeedback.userId?.name,
          email: populatedFeedback.userId?.email,
          avatar: populatedFeedback.userId?.avatar,
        },
      };

      return result;
    } catch (error: any) {
      throw new BadRequest(`${error.message}`);
    }
  }

  async fetchAll(
    page: number,
    mentorId: string,
    searchData?: string
  ): Promise<{ feedbacks: PopulatedFeedBack[]; totalPages: number }> {
    try {

      const limit = 5;
      const skip = (page - 1) * limit;

      const filter: any = { mentorId };
      if ( searchData?.trim()) {
        const searchRegex = new RegExp(searchData.trim(), "i");
        filter.$or = [{ message: searchRegex }];
      }

      const totalCount = await FeedBackSchema.countDocuments(filter);
      const totalPages = Math.ceil(totalCount / limit);

      const feedbackDocs = await FeedBackSchema.find(filter)
        .populate<{
          userId: {
            _id: Types.ObjectId;
            name: string;
            email: string;
            avatar?: string;
          };
        }>({
          path: "userId",
          select: "name email avatar",
        })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean();

      const feedbacks: PopulatedFeedBack[] = feedbackDocs.map((fb) => {
        const { userId, ...rest } = fb;
        return {
          ...rest,
          user: {
            id: userId?._id?.toString(),
            name: userId?.name,
            email: userId?.email,
            avatar: userId?.avatar,
          },
        };
      });

      return { feedbacks, totalPages };
    } catch (error: any) {
      console.error(error);
      throw new Error(`Failed to fetch feedbacks: ${error.message}`);
    }
  }

  async disLikeAndLike(
    id: string,
    userId: string,
    option: "like" | "disLike",
    remove: boolean
  ): Promise<void> {
    try {
      if (!id || !userId)
        throw new BadRequest("Feedback ID and User ID are required");

      const opt = option.toLowerCase() as "like" | "dislike";
      const fieldToAdd = opt;
      const fieldToRemove = opt === "like" ? "dislike" : "like";

      const userIdStr = userId.toString();

      const update: any = { $pull: {}, $addToSet: {} };
      update.$pull[fieldToRemove] = userIdStr;

      if (remove) {
        update.$pull[fieldToAdd] = userIdStr;
        delete update.$addToSet;
      } else {
        update.$addToSet[fieldToAdd] = userIdStr;
      }

      const updated = await FeedBackSchema.findByIdAndUpdate(id, update, {
        new: true,
      });

      if (!updated) throw new BadRequest("Feedback not found");
    } catch (error: any) {
      console.error("Error updating like/dislike:", error);
      throw new BadRequest(error.message || "Failed to update feedback");
    }
  }
}
