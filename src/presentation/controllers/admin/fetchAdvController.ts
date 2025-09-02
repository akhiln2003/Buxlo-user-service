import { NextFunction, Request, Response } from "express";
import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";
import { IFetchAdvUseCase } from "../../../application/interface/admin/IFetchAdvUseCase";

export class FetchAdvController {
  constructor(private _fetchAdvUseCase: IFetchAdvUseCase) {}
  fetchData = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page } = req.query;

        const responesData = await this._fetchAdvUseCase.execute(Number(page));
      
      res.status(HttpStatusCode.OK).json({ ...responesData });
    } catch (error) {
      next(error);
    }
  };
}
