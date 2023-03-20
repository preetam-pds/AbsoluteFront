import { APIGatewayProxyEvent } from "aws-lambda";
import "source-map-support/register";
import JoiUtility, { joiReqObjectEnum } from "../utils/joi-utility/ErrorUtility";
import LoginJoiValidation from "../utils/joi-utility/joi-schemas/login-schema";
import Utility from "../utils/Utility";

const validate = (event: APIGatewayProxyEvent) => {
  const body: LoginRequestModel = JSON.parse(event.body);
  const validation = new JoiUtility();
  validation.validate(event, joiReqObjectEnum.REQUEST_BODY, LoginJoiValidation);
  return body;
};

export const loginHandler = async (event: APIGatewayProxyEvent) => {
  try {
    console.log("-----started login");

    const body = validate(event);
    console.log("-----ended login");

    return Utility.buildResponse(200, { code: 200, message: "Success" });
  } catch (err) {
    console.log(err);
    return {
      statusCode: err.code,
      body: err.message,
    };
  }
};

interface LoginRequestModel {
  email: string;
  password: string;
}
