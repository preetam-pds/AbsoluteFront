import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { updateStoreHandler } from "../../../src/handlers/update-store";
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
        "is_clark_store": true,
        "map_icon": "http://maps.google.com/maps",
        "is_appointment_store": false,
        "description": "Clarks store in Witney",
          "opening_hours": [
          {
            "day": "Sunday",
            "from": "11:00 AM",
            "to": "07:00 PM"
          },
          {
            "day": "Monday",
            "from": "11:00 AM",
            "to": "07:00 PM"
          },
          {
            "day": "Tuesday",
            "from": "11:00 AM",
            "to": "07:00 PM"
          },
          {
            "day": "Wednesday",
            "from": "11:00 AM",
            "to": "07:00 PM"
          },
          {
            "day": "Thursday",
            "from": "11:00 AM",
            "to": "07:00 PM"
          },
          {
            "day": "Friday",
            "from": "11:00 AM",
            "to": "07:00 PM"
          },
          {
            "day": "Saturday",
            "from": "11:00 AM",
            "to": "07:00 PM"
          }
        ]
      },
      { method: "GET", path: "/:store_id" }
    );

    const result = await updateStoreHandler(event);

    expect(result.statusCode).toEqual(201);
    expect(JSON.parse(result.body)).toMatchObject("Successfully updated store");
    expect(putSpy).toHaveBeenCalled();
  });
});
