import { NextFunction, Request, Response } from "express";
import { ICreateTurstedUsUsecase } from "../../../application/interface/admin/ICreateTurstedUsUsecase";
import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";

export class CreateTrustedUsUsController {
  constructor(private _createTurstedUsUsecase: ICreateTurstedUsUsecase) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this._createTurstedUsUsecase.execute(req.file);

      res.status(HttpStatusCode.OK).json({ data });
    } catch (error) {
      next(error);
    }
  };
}
