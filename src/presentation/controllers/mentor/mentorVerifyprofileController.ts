import { NextFunction, Request, Response } from "express";
import { ImentorVerifyprofileUseCase } from "../../../application/interface/mentor/ImentorVerifyprofileUseCase";

export class MentorVerifyprofileController {
  constructor(
    private _mentorVerifyprofileUseCase: ImentorVerifyprofileUseCase
  ) {}
  verify = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { data } = req.body;

      const responseData = await this._mentorVerifyprofileUseCase.execute(
        data.id,
        req.files,
        {
          aadhaarName: data.aadhaarName,
          aadhaarNumber: data.aadhaarNumber,
          aadhaarBackImage: "",
          aadhaarFrontImage: "",
          verified: "verificationPending",
        }
      );

      res.status(200).json({ responseData });
    } catch (error) {
      console.error("Error during verification:", error);
      next(error);
    }
  };
}
