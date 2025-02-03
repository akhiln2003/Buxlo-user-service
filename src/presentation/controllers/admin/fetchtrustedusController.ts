import { NextFunction, Request, Response } from "express";
import { IfetchtrustedUsUseCase } from "../../../application/interface/admin/IfetchtrustedUsUseCase";
import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";

export class FetchtrustedusController {
  constructor(private fetchtrustedUsUseCase: IfetchtrustedUsUseCase) {}
  fetchData = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page } = req.query;
        const responseData = await this.fetchtrustedUsUseCase.execute(Number(page));
      
      res.status(HttpStatusCode.OK).json({ ...responseData });
    } catch (error) {
      next(error);
    }
  };
}
