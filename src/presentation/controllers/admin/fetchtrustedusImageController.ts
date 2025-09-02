import { NextFunction, Request, Response } from "express";
import { IFetchS3ImageUseCase } from "../../../application/interface/common/IFetchS3ImageUseCase";
import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";

export class FetchtrustedusImageController {
  constructor(private _fetchS3ImageUseCase: IFetchS3ImageUseCase) {}

  fetchImages = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { keys } = req.body;

      const imageUrl = await this._fetchS3ImageUseCase.execute(keys);
      res.status(HttpStatusCode.OK).json({ imageUrl });
    } catch (error) {
      next(error);
    }
  };
}
