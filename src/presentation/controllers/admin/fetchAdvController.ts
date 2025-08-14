import { NextFunction, Request, Response } from "express";
import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";
import { IfetchAdvUseCase } from "../../../application/interface/admin/IfetchAdvUseCase";

export class FetchAdvController {
  constructor(private _fetchAdvUseCase: IfetchAdvUseCase) {}
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
