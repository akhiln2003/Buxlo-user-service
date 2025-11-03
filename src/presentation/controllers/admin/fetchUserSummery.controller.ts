import { NextFunction, Request, Response } from "express";
import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";
import { IFetchUserSummeryUseCase } from "../../../application/interface/admin/IFetchUserSummeryUseCase";

export class FetchUserSummeryController {
  constructor(private _fetchUserSummeryUseCase: IFetchUserSummeryUseCase) {}
  fetch = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this._fetchUserSummeryUseCase.execute();
      res.status(HttpStatusCode.OK).json(data);
    } catch (error) {
      next(error);
    }
  };
}
