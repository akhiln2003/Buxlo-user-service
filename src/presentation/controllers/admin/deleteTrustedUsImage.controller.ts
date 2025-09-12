import { NextFunction, Request, Response } from "express";
import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";
import { IDeleteTrustedUsUseCase } from "../../../application/interface/admin/IDeleteTrustedUsUseCase";

export class DeleteTrustedUsImageController {
  constructor(private _deleteTrustedUsUseCase: IDeleteTrustedUsUseCase) {}
  deleteImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { key, id } = req.params;

      const response = await this._deleteTrustedUsUseCase.execute(key, id);

      res.status(HttpStatusCode.OK).json({ response });
    } catch (error) {
      next(error);
    }
  };
}
