import { NextFunction, Request, Response } from "express";
import { NotFountError } from "@buxlo/common";
import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";
import { IFetchUserProfileUseCase } from "../../../application/interface/user/IFetchUserProfileUseCase";

export class FetchUserProfileController {
  constructor(private _fetchUserProfileUseCase: IFetchUserProfileUseCase) {}
  fetchData = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const data = await this._fetchUserProfileUseCase.execute(id);
      if (!data) {
        throw new NotFountError("This user is not valid");
      }
      res.status(HttpStatusCode.OK).json({ data });
    } catch (error) {
      next(error);
    }
  };
}
