import Joi from "joi";
//import { schemas } from "../../helpers";

//const { stringArray, paginateValidationSchema } = schemas;

export const formValidateSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  dob: Joi.string().required(),
  country: Joi.string().required(),
  address: Joi.string().required(),
});

export const paginateValidationSchema = Joi.object({
  sort: Joi.string().default("-createdAt").optional(),
  offset: Joi.number().greater(-1).default(0).optional(),
  limit: Joi.number().greater(0).default(25).positive().optional(),
  filter: Joi.string().optional(),
});

export const tableRowValidateSchema = Joi.object({
  _id: Joi.string().required(),
  name: Joi.string().optional(),
  email: Joi.string().optional(),
  dob: Joi.string().optional(),
  country: Joi.string().optional(),
  address: Joi.string().optional(),
});

/* export const multipleSuggestionSchema = Joi.array().items(suggestionSchema);

export const suggestionIdValidateSchema = Joi.object({
  suggestionId: Joi.string().required(),
});

export const suggestionIdsValidateSchema = Joi.object({
  suggestionId: stringArray.required(),
});

export const paginateSuggestionValidateSchema = paginateValidationSchema;
 */
