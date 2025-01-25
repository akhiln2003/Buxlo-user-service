import { NextFunction, Request, Response } from "express";
import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";
import { IdeleteTrustedUsUseCase } from "../../../application/interface/admin/IdeleteTrustedUsUseCase";

export class DeleteTrustedUsImageController {
  constructor(private deleteTrustedUsUseCase: IdeleteTrustedUsUseCase) {}
  deleteImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { key, id } = req.params;

      const response = await this.deleteTrustedUsUseCase.execute(key, id);

      res.status(HttpStatusCode.OK).json({ response });
    } catch (error) {
      next(error);
    }
  };
}
