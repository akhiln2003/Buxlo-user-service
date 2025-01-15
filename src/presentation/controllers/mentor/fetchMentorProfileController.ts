import { NextFunction, Request, Response } from "express";
import { IfetchMentorProfileUseCase } from "../../../application/interface/mentor/IfetchMentorProfileUseCase";
import { NotFountError } from "@buxlo/common";
import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";

export class FetchMentorProfileController {
  constructor(private fetchMentorProfileUseCase: IfetchMentorProfileUseCase) {}
  fetchData = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;      
      const data = await this.fetchMentorProfileUseCase.execute(id);
      if (!data) {
        throw new NotFountError("This user is not valid");
      }
      res.status(HttpStatusCode.OK).json({ data });
    } catch (error) {
      next(error);
    }
  };
}
