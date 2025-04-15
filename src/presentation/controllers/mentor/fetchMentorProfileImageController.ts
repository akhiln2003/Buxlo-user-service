import { NextFunction, Request, Response } from "express";
import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";
import { IfetchS3ImageUseCase } from "../../../application/interface/common/IfetchS3ImageUseCase";

export class FetchMentorProfileImageController {
  constructor(private fetchS3ImageUseCase: IfetchS3ImageUseCase ) {}
  fetchImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { keys } = req.body;
      const imageUrl = await this.fetchS3ImageUseCase.execute(keys);
      res.status(HttpStatusCode.OK).json({ imageUrl });
    } catch (error) {
      next(error);
    }
  };
}
