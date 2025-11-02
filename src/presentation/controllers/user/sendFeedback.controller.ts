import { NextFunction, Request, Response } from "express";
import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";
import { ISendFeedbackUseCase } from "../../../application/interface/user/ISendFeedbackUseCase";

export class SendFeedbackController {
  constructor(private _sendFeedbackUseCase: ISendFeedbackUseCase) {}
  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this._sendFeedbackUseCase.execute(req.body);
      res.status(HttpStatusCode.OK).json(data);
    } catch (error) {
      next(error);
    }
  };
}
