import { IFeedbackRepository } from "../../../domain/interfaces/IFeedbackRepository";
import { IDisLikeAndLikeUseCase } from "../../interface/user/IDisLikeAndLikeUseCase";

export class DisLikeAndLikeUseCase implements IDisLikeAndLikeUseCase {
  constructor(private _feedbackRepository: IFeedbackRepository) {}

  async execute(data: {
    id: string;
    userId: string;
    option: "like" | "disLike";
    remove: boolean;
  }): Promise<void> {
    await this._feedbackRepository.disLikeAndLike(
      data.id,
      data.userId,
      data.option,
      data.remove
    );
  }
}
