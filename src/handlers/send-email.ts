import { APIGatewayProxyEvent } from "aws-lambda";
import "source-map-support/register";
import EmailUtility from "../utils/email-utility/EmailUtility";
import JoiUtility, { joiReqObjectEnum } from "../utils/joi-utility/ErrorUtility";
import SendEmailJoiVaidation from "../utils/joi-utility/joi-schemas/send-email-schema";
import Utility from "../utils/Utility";

const validate = (event: APIGatewayProxyEvent) => {
  const body: EmailRequestModel = JSON.parse(event.body);
  const validation = new JoiUtility();
  validation.validate(event, joiReqObjectEnum.REQUEST_BODY, SendEmailJoiVaidation);
  return body;
};
export const sendEmailHandler = async (event: APIGatewayProxyEvent) => {
  try {
    console.log("-----started send email");

    const requestBody = validate(event);
    let { name, to, subject, body, cc, bcc, attachments } = requestBody;
    const emailService = await new EmailUtility(
      process.env.kAdminEmailId,
      process.env.kEmailUserName,
      process.env.kEmailPassword,
      process.env.kEmailSenderId,
    ).sendMail(name, to, subject, body, cc, bcc, attachments);

    console.log(emailService, "----------emailService response");
    console.log("-----ended send email");

    return Utility.buildResponse(200, {
      code: 200,
      message: `Invitation successfully sent to ${requestBody.name}`,
    });
  } catch (err) {
    return {
      statusCode: err.code,
      body: err.message,
    };
  }
};
interface EmailRequestModel {
  name: string;
  to: Array<string> | string;
  subject: string;
  body: string;
  cc: Array<string> | string;
  bcc: Array<string> | string;
  attachments: string;
  inviteLink: string;
}
