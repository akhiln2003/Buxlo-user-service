import { IFeedbackRepository } from "../../../domain/interfaces/IFeedbackRepository";
import {
  FeedBackMapper,
  FeedBackResponseDto,
} from "../../dto/feedbackResponse.dto";

import {
  ISendFeedbackUseCase,
  ISendFeedbackUseCaseProps,
} from "../../interface/user/ISendFeedbackUseCase";

export class SendFeedbackUseCase implements ISendFeedbackUseCase {
  constructor(private _feedbackRepository: IFeedbackRepository) {}
  async execute(data: ISendFeedbackUseCaseProps): Promise<FeedBackResponseDto> {
    const newData = await this._feedbackRepository.create(data);

    return FeedBackMapper.toDto(newData);
  }
}
