import { NextFunction, Request, Response } from "express";
import { IadminVerifyprofileUseCase } from "../../../application/interface/admin/IadminVerifyprofileUseCase";
import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";

export class VerifyprofileController {
  constructor(private _adminVerifyprofileUseCase: IadminVerifyprofileUseCase) {}
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
