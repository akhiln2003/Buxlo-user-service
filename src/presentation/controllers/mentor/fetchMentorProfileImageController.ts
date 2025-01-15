import { NextFunction, Request, Response } from "express";
import { IfetchMentorProfileImageUseCase } from "../../../application/interface/common/fetchMentorProfileImageUseCase";
import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";

export class FetchMentorProfileImageController {
  constructor(
    private fetchMentorProfileImageUseCase: IfetchMentorProfileImageUseCase
  ) {}
  fetchImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { key } = req.params;
      const imageUrl = await this.fetchMentorProfileImageUseCase.execute(
        `mentorProfiles/${key}`
      );
      res.status(HttpStatusCode.OK).json({ imageUrl });
    } catch (error) {
      next(error);
    }
  };
}
