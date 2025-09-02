import { NextFunction, Request, Response } from "express";
import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";
import { IDeleteAdvUseCase } from "../../../application/interface/admin/IDeleteAdvUsecase";

export class DdeleteAdvImageController {
  constructor(private _deleteAdvImageUseCase: IDeleteAdvUseCase) {}
  deleteImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { key, id } = req.params;

      const data = await this._deleteAdvImageUseCase.execute(key, id);

      res.status(HttpStatusCode.OK).json({ data });
    } catch (error) {
      next(error);
    }
  };
}
