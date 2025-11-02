import { FeedBackResponseDto } from "../../dto/feedbackResponse.dto";

export interface IFetchFeedbackUseCase {
  execute(
    page: number,
    mentorId:string,
    searchData?: string
  ): Promise<{
    feedbacks: FeedBackResponseDto[] | [];
    totalPages: number;
  }>;
}
