import { NextFunction, Request, Response } from "express";
import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";
import { IdeleteAdvUseCase } from "../../../application/interface/admin/IdeleteAdvUsecase";

export class DdeleteAdvImageController {
  constructor(private deleteAdvImageUseCase: IdeleteAdvUseCase) {}
  deleteImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { key, id } = req.params;

      const data = await this.deleteAdvImageUseCase.execute(key, id);

      res.status(HttpStatusCode.OK).json({ data });
    } catch (error) {
      next(error);
    }
  };
}
