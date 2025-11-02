import { FeedBackResponseDto } from "../../dto/feedbackResponse.dto";

export interface ISendFeedbackUseCaseProps {
  mentorId: string;
  userId: string;
  message: string;
  star: number;
}
export interface ISendFeedbackUseCase {
  execute(data: ISendFeedbackUseCaseProps): Promise<FeedBackResponseDto>;
}
