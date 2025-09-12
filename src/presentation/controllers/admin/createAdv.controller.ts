import { NextFunction, Request, Response } from "express";
import { ICreateAdvUsecase } from "../../../application/interface/admin/ICreateAdvUsecase";
import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";

export class CreateAdvController {
  constructor(private _createAdvUsecase: ICreateAdvUsecase) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { data } = req.body;
      const file = req.file;

      delete data.id;
      delete data.currentImage;

      const responseData = await this._createAdvUsecase.execute(data, file);

      res.status(HttpStatusCode.OK).json({ responseData });
    } catch (error) {
      next(error);
    }
  };
}
