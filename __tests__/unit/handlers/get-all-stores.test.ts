import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { getAllStoresHandler } from "../../../src/handlers/get-all-stores";
import { constructAPIGwEvent } from "../../utils/helpers";
describe("Test getAllItemsHandler", () => {
  let scanSpy;

  beforeAll(() => {
    scanSpy = jest.spyOn(DocumentClient.prototype, "scan");
  });

  afterAll(() => {
    scanSpy.mockRestore();
  });

  it("should return ids", async () => {
    const items = {
      code: 200,
      data: [
        {
          is_clark_store: true,
          store_type: "2001",
          time_created: "2022-05-28 12:02:21.373+00",
          service_ids: [1, 2, 3],
          block_to: "2022-05-28 12:02:21.373",
          store_specific_content: "specific content",
          store_open_status: "1002",
          store_image: "http://www.",
          meta_title_store_name: "Store Name",
          block_from: "2022-05-28 12:02:21.373+00",
          block_reason: "Bank Holiday",
          map_icon: "http://maps.google.com/maps",
          store_features_1: "8796093487170 (6210)",
          keywords: "Store, Clarks",
          store_features: ["Mens", "Womens", "Originals"],
          is_appointment_store: false,
          latitude: "10`11",
          api_seceret_key: "dqwdqjjkjnj@jnkandjn+njnja_nknd",
          store_profile: "Z120",
          store_id: "5024",
          client_id: 1,
          no_index: false,
          api_key: "ADMCKKSMMWKMSBCNDJDMSMANAMN",
          opening_hours: [
            {
              day: "Sunday",
              from: "11:00 AM",
              to: "07:00 PM",
            },
            {
              day: "Monday",
              from: "11:00 AM",
              to: "07:00 PM",
            },
            {
              day: "Tuesday",
              from: "11:00 AM",
              to: "07:00 PM",
            },
          ],
          address: "Originals London Soho 32 Berwick Street LONDON W1F 8RL",
          last_changes: [
            {
              date: "12/20/2023",
              changes: "timings",
            },
            {
              date: "12/20/2023",
              changes: "timings",
            },
            {
              date: "12/20/2023",
              changes: "timings",
            },
          ],
          display_name: "ORIGINALS LONDON SOHO",
          no_follow: true,
          time_modified: "2022-05-28 12:02:21.373",
          longitude: "12`3",
          geo_coding_timestamp: "2022-05-28 12:02:21.373+00",
          description: "Originals London store in Soho",
        },
        {
          is_clark_store: true,
          store_type: "2001",
          time_created: "2022-05-28 12:02:21.373+00",
          service_ids: [1, 2, 3],
          block_to: "2022-05-28 12:02:21.373",
          store_specific_content: "specific content",
          store_open_status: "1001",
          store_image: "http://www.",
          meta_title_store_name: "Store Name",
          block_from: "2022-05-28 12:02:21.373+00",
          block_reason: "Bank Holiday",
          map_icon: "http://maps.google.com/maps",
          store_features_1: "8796093487170 (6210)",
          keywords: "Store, Clarks",
          store_features: ["Mens", "Womens", "Kids", "Originals"],
          is_appointment_store: false,
          latitude: "10`11",
          api_seceret_key: "dqwdqjjkjnj@jnkandjn+njnja_nknd",
          store_profile: "Z120",
          store_id: "3257",
          client_id: 1,
          no_index: false,
          api_key: "ADMCKKSMMWKMSBCNDJDMSMANAMN",
          opening_hours: [
            {
              day: "Sunday",
              from: "11:00 AM",
              to: "07:00 PM",
            },
            {
              day: "Monday",
              from: "11:00 AM",
              to: "07:00 PM",
            },
            {
              day: "Tuesday",
              from: "11:00 AM",
              to: "07:00 PM",
            },
            {
              day: "Wednesday",
              from: "11:00 AM",
              to: "07:00 PM",
            },
            {
              day: "Thursday",
              from: "11:00 AM",
              to: "07:00 PM",
            },
            {
              day: "Friday",
              from: "11:00 AM",
              to: "07:00 PM",
            },
            {
              day: "Saturday",
              from: "11:00 AM",
              to: "07:00 PM",
            },
          ],
          address: "Afghanistan",
          last_changes: [
            {
              date: "12/20/2023",
              changes: "timings",
            },
            {
              date: "12/20/2023",
              changes: "timings",
            },
            {
              date: "12/20/2023",
              changes: "timings",
            },
          ],
          display_name: "CLARKS LONDON OXFORD CIRCUS",
          no_follow: true,
          time_modified: "2022-05-28 12:02:21.373",
          longitude: "12`3",
          geo_coding_timestamp: "2022-05-28 12:02:21.373+00",
          description: "Clarks London store in Oxford Circus",
        },
        {
          is_clark_store: true,
          store_type: "2002",
          time_created: "2022-05-28 12:02:21.373+00",
          service_ids: [1, 2, 3],
          block_to: "2022-05-28 12:02:21.373",
          store_specific_content: "specific content",
          store_open_status: "1001",
          store_image: "http://www.",
          meta_title_store_name: "Store Name",
          block_from: "2022-05-28 12:02:21.373+00",
          block_reason: "Bank Holiday",
          map_icon: "http://maps.google.com/maps",
          store_features_1: "8796093487170 (6210)",
          keywords: "Store, Clarks",
          store_features: ["Mens", "Womens", "Kids", "Originals"],
          is_appointment_store: false,
          latitude: "10`11",
          api_seceret_key: "dqwdqjjkjnj@jnkandjn+njnja_nknd",
          store_profile: "Z121",
          store_id: "0050",
          client_id: 1,
          no_index: false,
          api_key: "ADMCKKSMMWKMSBCNDJDMSMANAMN",
          opening_hours: [
            {
              day: "Sunday",
              from: "11:00 AM",
              to: "07:00 PM",
            },
            {
              day: "Monday",
              from: "11:00 AM",
              to: "07:00 PM",
            },
            {
              day: "Tuesday",
              from: "11:00 AM",
              to: "07:00 PM",
            },
            {
              day: "Wednesday",
              from: "11:00 AM",
              to: "07:00 PM",
            },
            {
              day: "Thursday",
              from: "11:00 AM",
              to: "07:00 PM",
            },
            {
              day: "Friday",
              from: "11:00 AM",
              to: "07:00 PM",
            },
            {
              day: "Saturday",
              from: "11:00 AM",
              to: "07:00 PM",
            },
          ],
          address:
            "Clarks London Victoria St 149/151 Victoria Street LONDON SW1E 5NH",
          last_changes: [
            {
              date: "12/20/2023",
              changes: "timings",
            },
            {
              date: "12/20/2023",
              changes: "timings",
            },
            {
              date: "12/20/2023",
              changes: "timings",
            },
          ],
          display_name: "CLARKS LONDON VICTORIA ST",
          no_follow: true,
          time_modified: "2022-05-28 12:02:21.373",
          longitude: "12`3",
          geo_coding_timestamp: "2022-05-28 12:02:21.373+00",
          description: "Clarks London store in Victoria Street",
        },
      ],
    };

    scanSpy.mockReturnValue({
      promise: () => Promise.resolve({ Items: items }),
    });

    const event = constructAPIGwEvent({}, { method: "GET" });

    const result = await getAllStoresHandler(event);

    const expectedResult = {
      statusCode: 200,
      body: JSON.stringify(items),
    };

    expect(result).toEqual(expectedResult);
  });
});
