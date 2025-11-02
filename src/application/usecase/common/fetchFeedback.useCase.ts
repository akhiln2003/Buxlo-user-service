import { IFeedbackRepository } from "../../../domain/interfaces/IFeedbackRepository";
import {
  FeedBackMapper,
  FeedBackResponseDto,
} from "../../dto/feedbackResponse.dto";
import { IFetchFeedbackUseCase } from "../../interface/common/IFetchFeedbackUseCase";

export class FetchFeedbackUseCase implements IFetchFeedbackUseCase {
  constructor(private _feedbackRepository: IFeedbackRepository) {}

  async execute(
    page: number,
    mentorId:string,
    searchData?: string
  ): Promise<{
    feedbacks: FeedBackResponseDto[] | [];
    totalPages: number;
  }> {
    const result = await this._feedbackRepository.fetchAll(page , mentorId, searchData);
    let feedbacks: FeedBackResponseDto[] | [] = [];
    if (result.feedbacks.length) {
      feedbacks = FeedBackMapper.toDtos(result.feedbacks);
    }
    return { feedbacks, totalPages: result.totalPages };
  }
}
