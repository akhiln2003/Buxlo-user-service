import { NextFunction, Request, Response } from "express";
import {
  IMentorUpdateData,
  IUpdateMentorProfileUseCase,
} from "../../../application/interface/mentor/IUpdateMentorProfileUseCase";
import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";

export class UpdateMentorProfileController {
  constructor(
    private _updateMentorProfileUseCase: IUpdateMentorProfileUseCase
  ) {}
  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id, updatedData, currentProfileImage } = req.body;

      const { file } = req;
      const data = await this._updateMentorProfileUseCase.execute(
        id,
        updatedData as IMentorUpdateData,
        file,
        currentProfileImage
      );

      res.status(HttpStatusCode.OK).json({ data });
    } catch (error) {
      next(error);
    }
  };
}
