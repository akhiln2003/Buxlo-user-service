import { NextFunction, Request, Response } from "express";
import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";
import { IfetchProfileImageUseCase } from "../../../application/interface/common/fetchMentorProfileImageUseCase";

export class FetchMentorProfileImageController {
  constructor(private fetchProfileImageUseCase: IfetchProfileImageUseCase) {}
  fetchImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { key } = req.params;
      const imageUrl = await this.fetchProfileImageUseCase.execute(
        `mentorProfiles/${key}`
      );
      res.status(HttpStatusCode.OK).json({ imageUrl });
    } catch (error) {
      next(error);
    }
  };
}
