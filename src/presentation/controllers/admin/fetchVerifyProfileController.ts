import { NextFunction, Request, Response } from "express";
import { IadminFetchVerifyProfilesUseCase } from "../../../application/interface/admin/IadminFetchVerifyProfiles";
import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";

export class FetchVerifyProfileController {
  constructor(
    private adminFetchVerifyProfilesUseCase: IadminFetchVerifyProfilesUseCase
  ) {}

  fetch = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page, searchData , verified } = req.query;
      const responseData = await this.adminFetchVerifyProfilesUseCase.execute(
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
