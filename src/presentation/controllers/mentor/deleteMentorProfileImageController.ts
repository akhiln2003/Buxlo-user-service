import { NextFunction, Request, Response } from "express";
import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";
import { IdeleteMentorProfileImageUseCase } from "../../../application/interface/common/IdeleteProfileImageUseCase";

export class DeleteMentorProfileImageController {
  constructor(
    private _deleteProfileImageUseCase: IdeleteMentorProfileImageUseCase
  ) {}
  deleteImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { key, id } = req.params;

      const data = await this._deleteProfileImageUseCase.execute(key, id);

      res.status(HttpStatusCode.OK).json({ data });
    } catch (error) {
      next(error);
    }
  };
}
