import { FeedBack, PopulatedFeedBack } from "../entities/feedback.entity";

export interface IFeedbackRepository {
  create(feedback: FeedBack): Promise<PopulatedFeedBack>;
  fetchAll(
    page: number,
    mentorId:string,
    searchData?: string
  ): Promise<{ feedbacks: PopulatedFeedBack[]; totalPages: number }>;
  disLikeAndLike(
    id: string,
    userId:string,
    option: "like" | "disLike",
    remove: boolean
  ): Promise<void>;
}
