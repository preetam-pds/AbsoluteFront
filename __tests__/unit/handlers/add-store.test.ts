import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { addStoreHandler } from "../../../src/handlers/add-store";
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
        store_id: "3257",
        display_name: "CLARKS LONDON OXFORD CIRCUS",
        map_icon: "http://maps.google.com/maps",
        description: "Clarks London store in Oxford Circus",
        is_clark_store: true,
        is_appointment_store: false,
        store_type: "2001",
        store_profile: "Z120",
        geo_coding_timestamp: "2022-05-28 12:02:21.373+00",
        latitude: "10`11",
        longitude: "12`3",
        address: "Afghanistan",
        opening_hours: [
          {
            day: "Sunday",
            from: "11:00 AM",
            to: "07:00 PM",
          },
          { day: "Monday", from: "11:00 AM", to: "07:00 PM" },
          { day: "Tuesday", from: "11:00 AM", to: "07:00 PM" },
          { day: "Wednesday", from: "11:00 AM", to: "07:00 PM" },
          { day: "Thursday", from: "11:00 AM", to: "07:00 PM" },
          { day: "Friday", from: "11:00 AM", to: "07:00 PM" },
          { day: "Saturday", from: "11:00 AM", to: "07:00 PM" },
        ],
        store_features_1: "8796093487170 (6210)",
        store_features: ["Mens", "Womens", "Kids", "Originals"],
        block_from: "2022-05-28 12:02:21.373+00",
        block_to: "2022-05-28 12:02:21.373",
        block_reason: "Bank Holiday",
        store_open_status: "1001",
        store_image: "http://www.",
        store_specific_content: "specific content",
        no_index: false,
        no_follow: true,
        time_created: "2022-05-28 12:02:21.373+00",
        time_modified: "2022-05-28 12:02:21.373",
        last_changes: [
          { date: "12/20/2023", changes: "timings" },
          { date: "12/20/2023", changes: "timings" },
          { date: "12/20/2023", changes: "timings" },
        ],
        keywords: "Store, Clarks",
        meta_title_store_name: "Store Name",
        service_ids: [1, 2, 3],
        client_id: 1,
        api_seceret_key: "dqwdqjjkjnj@jnkandjn+njnja_nknd",
        api_key: "ADMCKKSMMWKMSBCNDJDMSMANAMN",
      },
      { method: "POST" }
    );

    const result = await addStoreHandler(event);

    expect(result.statusCode).toEqual(201);
    expect(JSON.parse(result.body)).toMatchObject("Successfully added stores");
    expect(putSpy).toHaveBeenCalled();
  });
});
