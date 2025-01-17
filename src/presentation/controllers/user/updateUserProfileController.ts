import { NextFunction, Request, Response } from "express";
import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";
import { IupdateUserProfileUseCase, IuserUpdateData } from "../../../application/interface/user/IupdateUserProfileUseCase";

export class UpdateUserProfileController {
  constructor(private updateUserProfileUseCase: IupdateUserProfileUseCase) {}
  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id, updatedData , currentProfileImage } = req.body;      
      const { file } = req;
      const data = await this.updateUserProfileUseCase.execute(
        id,
        updatedData as IuserUpdateData,
        file,
        currentProfileImage
      );
      res.status(HttpStatusCode.OK).json({ data });
    } catch (error) {
      next(error);
    }
  };
}
