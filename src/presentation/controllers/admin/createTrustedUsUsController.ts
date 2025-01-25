import { NextFunction, Request, Response } from "express";
import { IcreateTurstedUsUsecase } from "../../../application/interface/admin/IcreateTurstedUsUsecase";
import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";

export class CreateTrustedUsUsController {
  constructor(private createTurstedUsUsecase: IcreateTurstedUsUsecase) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.createTurstedUsUsecase.execute(req.file);
      
      res.status(HttpStatusCode.OK).json({ data });
    } catch (error) {
      next(error);
    }
  };
}
