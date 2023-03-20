import { APIGatewayProxyEvent } from "aws-lambda";
import "source-map-support/register";
import DynamoDatabaseClient from "../utils/dynamodb";
import JoiUtility, { joiReqObjectEnum } from "../utils/joi-utility/ErrorUtility";
import AddStoreJoiValidation from "../utils/joi-utility/joi-schemas/add-store-shema";
import Utility from "../utils/Utility";

const validate = (event: APIGatewayProxyEvent) => {
  console.log(event.body, "-------body");
  const body = JSON.parse(event.body);
  const validation = new JoiUtility();
  validation.validate(event, joiReqObjectEnum.REQUEST_BODY, AddStoreJoiValidation);

  return body;
};
export const addStoreHandler = async (event: APIGatewayProxyEvent) => {
  try {
    console.log("-----started add store");
    const body = validate(event);
    const client = new DynamoDatabaseClient(process.env.TABLE_NAME);
    await client.add(body);
    console.log("-----ended add store");
    return Utility.buildResponse(200, {
      code: 200,
      message: "Successfully added a store",
    });
  } catch (err) {
    return {
      statusCode: err.code,
      body: err.message,
    };
  }
};
