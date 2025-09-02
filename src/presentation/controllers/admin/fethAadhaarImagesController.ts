import { NextFunction, Request, Response } from "express";
import { IFetchS3ImageUseCase } from "../../../application/interface/common/IFetchS3ImageUseCase";
import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";

export class FethAadhaarImagesController {
  constructor(private _fetchS3ImageUseCase: IFetchS3ImageUseCase) {}
  get = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const imageUrl = await this._fetchS3ImageUseCase.execute(req.body);
      res.status(HttpStatusCode.OK).json({ imageUrl });
    } catch (error) {
      next(error);
    }
  };
}
