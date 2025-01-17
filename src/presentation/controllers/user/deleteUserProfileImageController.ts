import { NextFunction, Request, Response } from "express";
import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";
import {  IdeleteUserProfileImageUseCase } from "../../../application/interface/common/IdeleteProfileImageUseCase";

export class DeleteUserProfileImageController {
  constructor(
    private deleteProfileImageUseCase: IdeleteUserProfileImageUseCase
  ) {}
  deleteImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { key, id } = req.params;

      const data = await this.deleteProfileImageUseCase.execute(key, id);

      res.status(HttpStatusCode.OK).json({ data });
    } catch (error) {
      next(error);
    }
  };
}
