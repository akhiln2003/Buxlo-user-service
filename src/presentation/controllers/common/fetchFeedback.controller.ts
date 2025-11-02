import { NextFunction, Request, Response } from "express";
import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";
import { IFetchFeedbackUseCase } from "../../../application/interface/common/IFetchFeedbackUseCase";

export class FetchFeedbackController {
  constructor(private _fetchFeedbackUseCase: IFetchFeedbackUseCase) {}
  fetch = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page, mentorId, searchData } = req.query;

      const data = await this._fetchFeedbackUseCase.execute(
        Number(page),
        mentorId as string,
        searchData as string
      );
      res.status(HttpStatusCode.OK).json(data);
    } catch (error) {
      next(error);
    }
  };
}
