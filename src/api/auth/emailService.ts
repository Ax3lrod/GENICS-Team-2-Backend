import { ServiceResponse } from "@/common/models/serviceResponse";
import { StatusCodes } from "http-status-codes";
import nodemailer from "nodemailer";

export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendPasswordResetEmail(to: string, message: string) {
    try {
      const mailOptions = {
        from: process.env.SMTP_USER,
        to,
        subject: "Password Reset Request",
        text: message,
        html: `<p>${message}</p>`,
      };

      await this.transporter.sendMail(mailOptions);

      return ServiceResponse.success("Password reset email sent", null, StatusCodes.OK);
    } catch (error) {
      return ServiceResponse.failure(
        "An error occured during send password reset email",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
