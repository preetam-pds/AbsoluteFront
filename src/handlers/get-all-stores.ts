import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import "source-map-support/register";
import DynamoDatabaseClient from "../utils/dynamodb";
import Utility from "../utils/Utility";

export const getAllStoresHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    console.log("-----started get all store");

    const dbClient = new DynamoDatabaseClient(process.env.TABLE_NAME);
    const items = await dbClient.findAll();

    console.log("-----ended get all store");

    return Utility.buildResponse(200, { code: 200, data: items });
  } catch (err) {
    console.log(err);
    return {
      statusCode: err.code,
      body: err.message,
    };
  }
};
