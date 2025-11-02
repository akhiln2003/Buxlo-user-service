import { BadRequest } from "@buxlo/common";
import { z } from "zod";
import { PopulatedFeedBack } from "../../domain/entities/feedback.entity";

export const FeedBackResponseDto = z.object({
  id: z.string(),
  mentorId: z.string(),
  message: z.string(),
  star: z.number().min(1).max(5),
  like: z.array(z.string()).default([]),
  dislike: z.array(z.string()).default([]),
  createdAt: z.string(),
  updatedAt: z.string(),
  user: z.object({
    id: z.string().optional(),
    name: z.string(),
    email: z.string(),
    avatar: z.string().optional(),
  }),
});

export type FeedBackResponseDto = z.infer<typeof FeedBackResponseDto>;

interface IFeedBack extends PopulatedFeedBack {
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class FeedBackMapper {
  static toDto(feedback: IFeedBack): FeedBackResponseDto {
    if (!feedback) {
      throw new BadRequest("Feedback not found");
    }

    return FeedBackResponseDto.parse({
      id: feedback._id?.toString() || feedback.id?.toString() || "",
      mentorId: feedback.mentorId,
      message: feedback.message,
      star: feedback.star,
      like: feedback.like ?? [],
      dislike: feedback.dislike ?? [],
      createdAt: feedback.createdAt?.toISOString() || new Date().toISOString(),
      updatedAt: feedback.updatedAt?.toISOString() || new Date().toISOString(),
      user: {
        id: feedback.user?.id?.toString(),
        name: feedback.user?.name,
        email: feedback.user?.email,
        avatar: feedback.user?.avatar,
      },
    });
  }

  static toDtos(feedbacks: IFeedBack[]): FeedBackResponseDto[] {
    return feedbacks.map((fb) => this.toDto(fb));
  }
}
