import Nodemailer from "../../../config/nodemailer.js";
import env from "../../../config/env.js";
import logger from "../../utils/logger.js";

class MailService {
  static sendMail = async ({ to, subject, html, text }) => {
    try {
      await Nodemailer.transporter.sendMail({
        from: `Dropio <${env.mail.from}>`,
        to,
        subject,
        html,
        text,
      });
    } catch (error) {
      logger.error(`Email sending failed. ${error.message}`);
    }
  };
}

export default MailService;
