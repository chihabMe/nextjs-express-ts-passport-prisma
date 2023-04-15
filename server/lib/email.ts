import nodemailer from "nodemailer";
import getEmailConfig from "../config/email.config";
const config = getEmailConfig();
const transporter = nodemailer.createTransport({
  host: config.host,
  port: config.port,
  auth: {
    user: config.user,
    pass: config.password,
  },
});
export const sendMail = transporter.sendMail;
export const sendVerificationEmail = ({
  to,
  subject,
  text,
  html,
}: {
  to: string;
  subject: string;
  text: string;
  html?: string;
}) => {
  return sendMail({
    from: config.serverEmail,
    to,
    text,
    html,
    subject,
  });
};
