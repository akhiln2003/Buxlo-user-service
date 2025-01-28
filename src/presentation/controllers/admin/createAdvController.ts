import { NextFunction, Request, Response } from "express";
import { IcreateAdvUsecase } from "../../../application/interface/admin/IcreateAdvUsecase";
import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";

export class CreateAdvController {
  constructor(private createAdvUsecase: IcreateAdvUsecase) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { data } = req.body;
      const file = req.file;

      delete data.id;
      delete data.currentImage;

      
      const responseData = await this.createAdvUsecase.execute(data, file);

      res.status(HttpStatusCode.OK).json({ responseData });
    } catch (error) {
      next(error);
    }
  };
}
