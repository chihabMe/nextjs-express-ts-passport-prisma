import nodemailer from "nodemailer";
import getEmailConfig from "../config/email.config";
import hbs from "nodemailer-express-handlebars";
import path from "path";
import { ExpressHandlebars } from "express-handlebars";
const root = process.cwd() + "/server/views";
const config = getEmailConfig();
const engine = new ExpressHandlebars({});
console.log("root", root);
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.user,
    pass: config.password,
  },
});
transporter.use(
  "compile",
  hbs({
    viewEngine: engine,
    viewPath: root,
    extName: ".hbs",
  })
);
//export const sendMail = transporter.sendMail;
export const sendVerificationEmail = ({
  to,
  subject,
  context,
}: {
  to: string;
  subject: string;
  context: any;
}) => {
  return transporter.sendMail({
    from: config.serverEmail,
    to,
    subject,
    //@ts-ignore
    context: {
      ...context,
      layout: false,
    },
    template: "verificationEmail",
  });
};
