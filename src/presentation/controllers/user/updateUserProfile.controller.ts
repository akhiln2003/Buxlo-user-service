import { NextFunction, Request, Response } from "express";
import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";
import {
  IUpdateUserProfileUseCase,
  IUserUpdateData,
} from "../../../application/interface/user/IUpdateUserProfileUseCase";

export class UpdateUserProfileController {
  constructor(private _updateUserProfileUseCase: IUpdateUserProfileUseCase) {}
  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id, updatedData, currentProfileImage } = req.body;
      const { file } = req;
      const data = await this._updateUserProfileUseCase.execute(
        id,
        updatedData as IUserUpdateData,
        file,
        currentProfileImage
      );
      res.status(HttpStatusCode.OK).json({ data });
    } catch (error) {
      next(error);
    }
  };
}
