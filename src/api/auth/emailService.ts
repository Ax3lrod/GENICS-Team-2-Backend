import { ServiceResponse } from "@/common/models/serviceResponse";
import { env } from "@/config/env";
import { StatusCodes } from "http-status-codes";
import nodemailer from "nodemailer";

export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: Number(env.SMTP_PORT),
      secure: false,
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
      },
    });
  }

  async sendPasswordResetEmail(to: string, message: string) {
    try {
      const mailOptions = {
        from: env.SMTP_USER,
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
