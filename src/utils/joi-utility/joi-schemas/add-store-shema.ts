import Joi from "joi";
import ErrorUtility from "../ErrorUtility";
// const complexityOptions = {
//   min: 8,
//   max: 32,
//   lowerCase: 1,
//   upperCase: 1,
//   numeric: 1,
//   symbol: 1,
//   requirementCount: 4,
// };

const AddStoreJoiValidation = Joi.object({
  store_id: Joi.string().required().messages(ErrorUtility.joiHelper("store_id", "string")),
  display_name: Joi.string().required().messages(ErrorUtility.joiHelper("display_name", "string")),
  map_icon: Joi.string().required().messages(ErrorUtility.joiHelper("map_icon", "string")),
  description: Joi.string().required().messages(ErrorUtility.joiHelper("description", "string")),

  is_clark_store: Joi.string().required().messages(ErrorUtility.joiHelper("is_clark_store", "string")),

  is_appointment_store: Joi.string().required().messages(ErrorUtility.joiHelper("is_appointment_store", "string")),

  store_type: Joi.string().required().messages(ErrorUtility.joiHelper("store_type", "string")),
  store_profile: Joi.string().required().messages(ErrorUtility.joiHelper("store_profile", "string")),
  geo_coding_timestamp: Joi.string()
    .required()
    .allow("")
    .messages(ErrorUtility.joiHelper("geo_coding_timestamp", "string")),
  latitude: Joi.string().required().messages(ErrorUtility.joiHelper("latitude", "string")),
  longitude: Joi.string().required().messages(ErrorUtility.joiHelper("longitude", "string")),
  address: Joi.string().required().messages(ErrorUtility.joiHelper("address", "string")),
  opening_hours: Joi.array()
    .min(1)
    .items(
      Joi.object({
        day: Joi.string().allow("").required().messages(ErrorUtility.joiHelper("day", "string", false, true, false)),
        from: Joi.string().allow("").required().messages(ErrorUtility.joiHelper("from", "string", false, true, false)),
        to: Joi.string().allow("").required().messages(ErrorUtility.joiHelper("to", "string", false, true, false)),
      }),
    )
    .optional()
    .messages(ErrorUtility.joiHelper("opening_hours", "array")),

  store_features_1: Joi.string().required().messages(ErrorUtility.joiHelper("store_features_1", "string")),
  store_features: Joi.array().min(1).optional().messages(ErrorUtility.joiHelper("store_features", "array")),

  block_from: Joi.string().required().messages(ErrorUtility.joiHelper("block_from", "string")),

  block_to: Joi.string().optional().messages(ErrorUtility.joiHelper("block_to", "string")),
  block_reason: Joi.string().optional().messages(ErrorUtility.joiHelper("block_reason", "string")),
  store_open_status: Joi.string().optional().messages(ErrorUtility.joiHelper("store_open_status", "string")),
  store_image: Joi.string().optional().messages(ErrorUtility.joiHelper("store_image", "string")),
  store_specific_content: Joi.string().optional().messages(ErrorUtility.joiHelper("store_specific_content", "string")),
  no_index: Joi.boolean().optional().messages(ErrorUtility.joiHelper("no_index", "boolean")),
  no_follow: Joi.boolean().optional().messages(ErrorUtility.joiHelper("no_follow", "boolean")),
  time_created: Joi.string().optional().messages(ErrorUtility.joiHelper("time_created", "string")),
  time_modified: Joi.string().optional().messages(ErrorUtility.joiHelper("time_modified", "string")),

  last_changes: Joi.array()
    .min(1)
    .items(
      Joi.object({
        date: Joi.string().allow("").required().messages(ErrorUtility.joiHelper("date", "string")),
        changes: Joi.string().allow("").required().messages(ErrorUtility.joiHelper("changes", "string")),
      }),
    )
    .optional()
    .messages(ErrorUtility.joiHelper("last_changes", "array")),

  keywords: Joi.string().optional().messages(ErrorUtility.joiHelper("keywords", "string")),
  meta_title_store_name: Joi.string().optional().messages(ErrorUtility.joiHelper("meta_title_store_name", "string")),
  service_ids: Joi.array().min(1).optional().messages(ErrorUtility.joiHelper("service_ids", "array")),
  client_id: Joi.number().optional().messages(ErrorUtility.joiHelper("client_id", "number")),
  api_seceret_key: Joi.string().optional().messages(ErrorUtility.joiHelper("api_seceret_key", "string")),
  api_key: Joi.string().optional().messages(ErrorUtility.joiHelper("api_key", "string")),
});

export default AddStoreJoiValidation;
