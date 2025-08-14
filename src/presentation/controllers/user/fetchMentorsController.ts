import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";
import { NextFunction, Request, Response } from "express";
import { IfetchMentorsUseCase } from "../../../application/interface/user/IfetchMentorsUseCase";

export class FetchMentorsController {
  constructor(private _fetchMentorsUseCase: IfetchMentorsUseCase) {}
  fetchData = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page, experience, rating, searchData } = req.query;
      const responseData = await this._fetchMentorsUseCase.execute(
        Number(page),
        String(experience),
        String(rating),
        String(searchData)
      );
      res.status(HttpStatusCode.OK).json({ ...responseData });
    } catch (error) {
      next(error);
    }
  };
}
