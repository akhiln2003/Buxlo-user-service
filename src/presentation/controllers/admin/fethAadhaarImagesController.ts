import { NextFunction, Request, Response } from "express";
import { IfetchS3ImageUseCase } from "../../../application/interface/common/IfetchS3ImageUseCase";
import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";

export class FethAadhaarImagesController {
  constructor(private fetchS3ImageUseCase: IfetchS3ImageUseCase) {}
  get = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const imageUrl = await this.fetchS3ImageUseCase.execute(req.body);
      res.status(HttpStatusCode.OK).json({ imageUrl });
    } catch (error) {
      next(error);
    }
  };
}
