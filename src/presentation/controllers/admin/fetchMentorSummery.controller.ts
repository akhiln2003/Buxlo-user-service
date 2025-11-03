import { NextFunction, Request, Response } from "express";
import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";
import { IFetchMentorSummeryUseCase } from "../../../application/interface/admin/IFetchMentorSummeryUseCase";

export class FetchMentorSummeryController {
  constructor(private _fetchMentorSummeryUseCase: IFetchMentorSummeryUseCase) {}
  fetch = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this._fetchMentorSummeryUseCase.execute();
      res.status(HttpStatusCode.OK).json(data);
    } catch (error) {
      next(error);
    }
  };
}
