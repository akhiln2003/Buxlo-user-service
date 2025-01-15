import { NextFunction, Request, Response } from "express";
import {
  IupdateData,
  IupdateMentorProfileUseCase,
} from "../../../application/interface/mentor/IupdateMentorProfileUseCase";
import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";

export class UpdateMentorProfileController {
  constructor(
    private updateMentorProfileUseCase: IupdateMentorProfileUseCase
  ) {}
  update = async (req: Request, res: Response, next: NextFunction) => {
    try {      
      const { id , updatedData } = req.body;
      const {file} = req;      
      const data = await this.updateMentorProfileUseCase.execute(
        id,
        updatedData as IupdateData,
        file
      );    
      res.status(HttpStatusCode.OK).json({ data });
    } catch (error) {
      next(error);
    }
  };
}
