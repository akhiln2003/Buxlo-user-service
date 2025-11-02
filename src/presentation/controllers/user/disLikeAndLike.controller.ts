import { NextFunction, Request, Response } from "express";
import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";
import { IDisLikeAndLikeUseCase } from "../../../application/interface/user/IDisLikeAndLikeUseCase";

export class DisLikeAndLikeController {
  constructor(private _disLikeAndLikeUseCase: IDisLikeAndLikeUseCase) {}
  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this._disLikeAndLikeUseCase.execute(req.body);
      res.status(HttpStatusCode.OK).json({ message: "Updated" });
    } catch (error) {
      next(error);
    }
  };
}
