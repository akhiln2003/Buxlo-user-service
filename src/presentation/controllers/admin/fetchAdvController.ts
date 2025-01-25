import { NextFunction, Request, Response } from "express";
import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";
import { IfetchAdvUseCase } from "../../../application/interface/admin/IfetchAdvUseCase";

export class FetchAdvController {
  constructor(private fetchAdvUseCase: IfetchAdvUseCase) {}
  fetchData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await this.fetchAdvUseCase.execute();
      
      res.status(HttpStatusCode.OK).json({ data });
    } catch (error) {
      next(error);
    }
  };
}
