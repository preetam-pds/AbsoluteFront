import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { loginHandler } from "../../../src/handlers/login";
import { constructAPIGwEvent } from "../../utils/helpers";

describe("Test putItemHandler", function () {
  let putSpy;
  beforeAll(() => {
    putSpy = jest.spyOn(DocumentClient.prototype, "put");
  });

  afterAll(() => {
    putSpy.mockRestore();
  });

  it("should add id to the SQS queue", async () => {
    putSpy.mockReturnValue(
      Promise.resolve({ MessageId: "5972648d-f5ec-4941-b1bc-1cd890982a22" })
    );

    const event = constructAPIGwEvent(
      {
        userName: "string",
        password: "string",
      },
      { method: "POST" }
    );

    const result = await loginHandler(event);
    
    expect(result.statusCode).toEqual(201);
    expect(JSON.parse(result.body)).toMatchObject("success");
    expect(putSpy).toHaveBeenCalled();
  });
});
