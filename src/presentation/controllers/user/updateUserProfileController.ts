import { NextFunction, Request, Response } from "express";
import { IupdateData } from "../../../application/interface/mentor/IupdateMentorProfileUseCase";
import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";
import { IupdateUserProfileUseCase } from "../../../application/interface/user/IupdateUserProfileUseCase";

export class UpdateUserProfileController {
  constructor(private updateUserProfileUseCase: IupdateUserProfileUseCase) {}
  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id, updatedData } = req.body;
      const { file } = req;
      const data = await this.updateUserProfileUseCase.execute(
        id,
        updatedData as IupdateData,
        file
      );
      res.status(HttpStatusCode.OK).json({ data });
    } catch (error) {
      next(error);
    }
  };
}
