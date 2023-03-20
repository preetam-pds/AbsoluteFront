import { APIGatewayProxyEvent } from "aws-lambda";
import "source-map-support/register";
import DynamoDatabaseClient from "../utils/dynamodb";
import JoiUtility, { joiReqObjectEnum } from "../utils/joi-utility/ErrorUtility";
import BulkInsertStoreJoiValidation from "../utils/joi-utility/joi-schemas/bulk-insert-stores-shema";
import Utility from "../utils/Utility";

const validate = (event: APIGatewayProxyEvent) => {
  const body = JSON.parse(event.body);
  const validation = new JoiUtility();
  validation.validate(event, joiReqObjectEnum.REQUEST_BODY, BulkInsertStoreJoiValidation);
  return body;
};
export const bulkInsertStoresHandler = async (event: APIGatewayProxyEvent) => {
  try {
    console.log("-----started bulk add store");
    const body = validate(event);
    for (let store of body) {
      console.log(store);
      const client = new DynamoDatabaseClient(process.env.TABLE_NAME);
      await client.add(store);
    }
    console.log("-----ended bulk add store");
    return Utility.buildResponse(200, { code: 200, message: "Successfully added stores" });
  } catch (err) {
    console.log("err--------", err);
    return {
      statusCode: err.code,
      body: err.message,
    };
  }
};
