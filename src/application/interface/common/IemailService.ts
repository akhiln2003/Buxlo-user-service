export interface IemailService {
    sendMail(from: string, subject: string, body: string): Promise<void>;
  }



  export interface IsendContactUsEmailUseCase {
    execute(input: IcontactUsEmailInput): Promise<void | boolean>;
  
  }



// for contactUs
export interface IcontactUsEmailInput {
  email: string;
  name: string;
  subject:string;
  message: string;
}