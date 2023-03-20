import Joi from "joi";
import ErrorUtility from "../ErrorUtility";
const SendEmailJoiVaidation = Joi.object({
  name: Joi.string()
    .required()
    .messages(ErrorUtility.joiHelper("name", "string")),

  to: Joi.string().required().messages(ErrorUtility.joiHelper("to", "string")),
  subject: Joi.string()
    .required()
    .messages(ErrorUtility.joiHelper("subject", "string")),
  body: Joi.string()
    .required()
    .messages(ErrorUtility.joiHelper("body", "string")),
  cc: Joi.array()
    .allow(null)
    .items(
      Joi.string().required().messages(ErrorUtility.joiHelper("cc", "string")),
    ),
  bcc: Joi.array()
    .allow(null)
    .items(
      Joi.string().required().messages(ErrorUtility.joiHelper("bcc", "string")),
    ),
  atatchements: Joi.string()
    .required()
    .messages(ErrorUtility.joiHelper("atatchements", "string")),
  inviteLink: Joi.string()
    .required()
    .messages(ErrorUtility.joiHelper("inviteLink", "string")),
});

export default SendEmailJoiVaidation;
