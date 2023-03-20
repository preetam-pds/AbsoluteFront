import Joi from "joi";
import ErrorUtility from "../ErrorUtility";
// const complexityOptions = {
//   min: 8,
//   max: 32,
//   lowerCase: 1,
//   upperCase: 1,
//   numeric: 1,
//   symbol: 1,
//   requirementCount: 4,
// };

const LoginJoiValidation = Joi.object({
  email: Joi.string()
    .required()
    .messages(ErrorUtility.joiHelper("email", "string")),
  password: Joi.string()
    .required()
    .messages(ErrorUtility.joiHelper("password", "string")),

  //   password: passwordComplexity(complexityOptions).messages(ErrorUtility.joiHelper("password", "string", false)),
});

export default LoginJoiValidation;
