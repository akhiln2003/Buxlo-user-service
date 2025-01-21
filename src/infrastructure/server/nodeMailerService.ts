import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { IemailService } from "../../application/interface/common/IemailService";

dotenv.config();

export class NodeMailerService implements IemailService {
  private readonly transporter;
  constructor() {
    if (!process.env.EMAIL_USER) {
      throw new Error("process.env.EMAIL_USER is not getting");
    }
    this.transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }
  async sendMail(from: string, subject: string, body: string): Promise<void> {
    const mailOptions = {
      from: `"${from}" <${process.env.EMAIL_USER}>`, // This will show as "from@email.com <your.gmail@gmail.com>"
      to: "buxlofinance@gmail.com",
      subject,
      html: body,
    };

    await this.transporter.sendMail(mailOptions);
}
}
