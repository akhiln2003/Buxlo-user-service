import { NextFunction, Request, Response } from "express";
import { IeditAdvUseCase } from "../../../application/interface/admin/IeditAdvUseCase";

export class EditAdvController {
  constructor(private _editAdvUseCase: IeditAdvUseCase) {}

  edit = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const file = req.file;
      const { data } = req.body;

      const responseData = await this._editAdvUseCase.execute(data, file);

      res.status(200).json({ responseData });
    } catch (error) {
      next(error);
    }
  };
}
