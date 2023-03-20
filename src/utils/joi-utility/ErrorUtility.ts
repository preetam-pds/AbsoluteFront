import { APIGatewayProxyEvent } from "aws-lambda";
import { ObjectSchema } from "joi";
import HttpError from "standard-http-error";
import Utility from "../Utility";
export const joiReqObjectEnum = {
  REQUEST_BODY: "1001",
  REQUEST_PARAMS: "1002",
  REQUEST_QUERY: "1003",
};

class JoiUtility {
  static errorMessages = (name: string, type: string) => {
    return {
      requiredMsg: JoiUtility.requiredMsg(name),
      typeMsg: JoiUtility.typeMsg(name, type),
      emptyMsg: JoiUtility.emptyMsg(name),
    };
  };
  static joiHelper = (
    name: string,
    type: string,
    isEmptyCheckRequired = true,
    isTypeCheckRequired = true,
    isRequiredCheckRequired = true
  ) => {
    let errors = {};
    isRequiredCheckRequired
      ? (errors["any.required"] = JoiUtility.requiredMsg(name))
      : undefined;
    isTypeCheckRequired
      ? (errors[`${type}.base`] = JoiUtility.typeMsg(name, type))
      : undefined;
    isEmptyCheckRequired
      ? (errors[`${type}.empty`] = JoiUtility.emptyMsg(name))
      : undefined;

    return errors;
  };
  static requiredMsg = (name) => `${name} is required`;
  static typeMsg = (name, type) => `${name} must be of type ${type}`;
  static emptyMsg = (name) => `${name} is not allowed to be empty`;

  // tslint:disable-next-line: no-empty
  validate(
    event: APIGatewayProxyEvent,
    requestType?: string,
    joiFunction: ObjectSchema<any> = undefined
  ) {
    const requestBody = Utility.trimInputs(JSON.parse(event.body));
    const pathParams = event.pathParameters;
    const queryParams = event.queryStringParameters;
    let validateReqObj;

    if (requestType === joiReqObjectEnum.REQUEST_BODY) {
      validateReqObj = requestBody;
    } else if (requestType === joiReqObjectEnum.REQUEST_PARAMS) {
      validateReqObj = pathParams;
    } else if (requestType === joiReqObjectEnum.REQUEST_QUERY) {
      validateReqObj = queryParams;
    }
    if (validateReqObj)
      joiFunction && this.joiValidationUtil(joiFunction, validateReqObj);
  }

  public joiValidationUtil(joiSchema: any, requestBody: any) {
    try {
      const { error } = joiSchema.validate(requestBody, {
        allowUnknown: true,
      });
      console.log("error joi ======>", error);
      if (error) {
        throw new HttpError(400, error.details[0].message.replace(/["]/gi, ""));
      }
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  }
}

export default JoiUtility;
