import { NextFunction, Request, Response } from "express";
import { IFetchtrustedUsUseCase } from "../../../application/interface/admin/IFetchtrustedUsUseCase";
import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";

export class FetchtrustedusController {
  constructor(private _fetchtrustedUsUseCase: IFetchtrustedUsUseCase) {}
  fetchData = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page } = req.query;
        const responseData = await this._fetchtrustedUsUseCase.execute(Number(page));
      
      res.status(HttpStatusCode.OK).json({ ...responseData });
    } catch (error) {
      next(error);
    }
  };
}
