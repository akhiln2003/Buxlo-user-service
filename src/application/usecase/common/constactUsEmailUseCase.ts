import { BadRequest } from "@buxlo/common";
import {
  IContactUsEmailInput,
  IEmailService,
  ISendContactUsEmailUseCase,
} from "../../interface/common/IEmailService";

export class SendContactUsEmailUseCase implements ISendContactUsEmailUseCase {
  constructor(private _emailService: IEmailService) {}

  async execute(input: IContactUsEmailInput): Promise<void | boolean> {
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
