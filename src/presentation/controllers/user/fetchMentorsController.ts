import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";
import { NextFunction, Request, Response } from "express";
import { IfetchMentorsUseCase } from "../../../application/interface/user/IfetchMentorsUseCase";

export class FetchMentorsController {
  constructor(private fetchMentorsUseCase: IfetchMentorsUseCase) {}
  fetchData = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page, experience, rating, salary, searchData } = req.query;
      const responseData = await this.fetchMentorsUseCase.execute(
        Number(page),
        String(experience),
        String(rating),
        String(salary),
        String(searchData)
      );
      res.status(HttpStatusCode.OK).json({ ...responseData });
    } catch (error) {
      next(error);
    }
  };
}
