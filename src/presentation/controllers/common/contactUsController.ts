import { NextFunction, Request, Response } from "express";
import { IsendContactUsEmailUseCase } from "../../../application/interface/common/IemailService";
import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";

export class ContactUsController {
  constructor(private sendContactUsEmailUseCase: IsendContactUsEmailUseCase) {}
  contact = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const sendMail = await this.sendContactUsEmailUseCase.execute(req.body);
      if (sendMail) {
        res.status(HttpStatusCode.OK).json({ message: "Message has been sent successfully out tam will get back to you 24 hours" });
      }
    } catch (error) {
      next(error);
    }
  };
}
