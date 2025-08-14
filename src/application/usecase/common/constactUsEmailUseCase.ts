import { BadRequest } from "@buxlo/common";
import {
  IcontactUsEmailInput,
  IemailService,
  IsendContactUsEmailUseCase,
} from "../../interface/common/IemailService";

export class SendContactUsEmailUseCase implements IsendContactUsEmailUseCase {
  constructor(private _emailService: IemailService) {}

  async execute(input: IcontactUsEmailInput): Promise<void | boolean> {
    try {
      const subject = input.subject;
      const body = input.message;
      await this._emailService.sendMail(input.email, subject, body);
      return true;
    } catch (error) {
      console.error(error);
      throw new BadRequest("Faild to reach us please try again laiter");
    }
  }
}
