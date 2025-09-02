import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";
import { NextFunction, Request, Response } from "express";
import { IFetchMentorsUseCase } from "../../../application/interface/user/IFetchMentorsUseCase";

export class FetchMentorsController {
  constructor(private _fetchMentorsUseCase: IFetchMentorsUseCase) {}
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
