import { APIGatewayProxyEvent } from "aws-lambda";
import "source-map-support/register";
import DynamoDatabaseClient from "../utils/dynamodb";
import JoiUtility, { joiReqObjectEnum } from "../utils/joi-utility/ErrorUtility";
import UpdateStoreJoiValidation from "../utils/joi-utility/joi-schemas/update-store-shema";
import Utility from "../utils/Utility";

const validate = (event: APIGatewayProxyEvent) => {
  console.log(event.body, "-------body");
  const body = JSON.parse(event.body);
  const validation = new JoiUtility();
  validation.validate(event, joiReqObjectEnum.REQUEST_BODY, UpdateStoreJoiValidation);
  return body;
};
export const updateStoreHandler = async (event: APIGatewayProxyEvent) => {
  try {
    console.log("-----started update store");

    const body = validate(event);
    const dbClient = new DynamoDatabaseClient(process.env.TABLE_NAME);
    await dbClient.update({ ...body, ...event.pathParameters }, "store_id");
    console.log("-----ended update store");

    return Utility.buildResponse(200, { code: 200, message: "Successfully update store" });
  } catch (err) {
    console.log(err);
    return {
      statusCode: err.code,
      body: err.message,
    };
  }
};
