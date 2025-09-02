import { NextFunction, Request, Response } from "express";
import { IAdminFetchVerifyProfilesUseCase } from "../../../application/interface/admin/IAdminFetchVerifyProfiles";
import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";

export class FetchVerifyProfileController {
  constructor(
    private _adminFetchVerifyProfilesUseCase: IAdminFetchVerifyProfilesUseCase
  ) {}

  fetch = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page, searchData, verified } = req.query;
      const responseData = await this._adminFetchVerifyProfilesUseCase.execute(
        Number(page),
        String(searchData),
        String(verified)
      );
      res.status(HttpStatusCode.OK).json({ ...responseData });
    } catch (error) {
      next(error);
    }
  };
}
