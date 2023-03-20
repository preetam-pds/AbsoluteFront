import Mailgen from "mailgen";
import * as nodemailer from "nodemailer";
class EmailUtility {
  private emailId;
  private userName;
  private password;
  private senderId;
  constructor(emailId, userName, password, senderId) {
    this.emailId = emailId;
    this.userName = userName;
    this.password = password;
    this.senderId = senderId;
  }
  public async sendMail(name, to, subject, body, cc, bcc, attachments) {
    try {
      var mailGenerator = new Mailgen({
        theme: "default",
        product: {
          name: "Clarks",
          link: "https://www.clarksusa.com/",
          logo: "https://www.clarks.in/_nuxt/img/logo.4463386.png",
        },
      });

      var email = {
        body: {
          greeting: `Hello`,
          name,
          outro: body,
          signature: "Warm Regards",
        },
      };

      let transporter = nodemailer.createTransport({
        host: "email-smtp.eu-west-1.amazonaws.com",
        port: 465,
        secure: true,
        auth: {
          user: this.userName,
          pass: this.password,
        },
      });

      // setup email data with unicode symbols
      let mailOptions = {
        from: `"${this.senderId}" <${this.emailId}>`, // sender address
        to,
        cc,
        bcc,
        subject,
        text: mailGenerator.generatePlaintext(email),
        html: mailGenerator.generate(email),
        attachments: attachments,
      };

      // console.log(mailOptions, "mail");

      // send mail with defined transport object
      return await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error("Unable to send Email", error);
    }
  }
}
export default EmailUtility;
