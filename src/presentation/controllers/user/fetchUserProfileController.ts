import { NextFunction, Request, Response } from "express";
import { NotFountError } from "@buxlo/common";
import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";
import { IfetchUserProfileUseCase } from "../../../application/interface/user/IfetchUserProfileUseCase";

export class FetchUserProfileController {
  constructor(private fetchUserProfileUseCase: IfetchUserProfileUseCase) {}
  fetchData = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const data = await this.fetchUserProfileUseCase.execute(id);
      if (!data) {
        throw new NotFountError("This user is not valid");
      }
      res.status(HttpStatusCode.OK).json({ data });
    } catch (error) {
      next(error);
    }
  };
}
