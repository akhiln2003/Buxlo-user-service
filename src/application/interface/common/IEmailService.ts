export interface IEmailService {
  sendMail(from: string, subject: string, body: string): Promise<void>;
}

export interface ISendContactUsEmailUseCase {
  execute(input: IContactUsEmailInput): Promise<void | boolean>;
}

// for contactUs
export interface IContactUsEmailInput {
  email: string;
  name: string;
  subject: string;
  message: string;
}
