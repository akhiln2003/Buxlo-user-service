import { NextFunction, Request, Response } from "express";
import { IAdminVerifyprofileUseCase } from "../../../application/interface/admin/IAdminVerifyprofileUseCase";
import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";

export class VerifyprofileController {
  constructor(private _adminVerifyprofileUseCase: IAdminVerifyprofileUseCase) {}
  verify = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id, verified, unsetData } = req.body;

      const updatedData = await this._adminVerifyprofileUseCase.execute(
        id,
        verified,
        unsetData
      );
      res.status(HttpStatusCode.OK).json({ updatedData });
    } catch (error) {
      next(error);
    }
  };
}
