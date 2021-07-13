import Joi from "joi";

// * SchemaInterface
type ValidTypes = string | number | boolean | Date;

type SchemaInterfaceValueTypes =
  | ValidTypes
  | SchemaInterface
  | SchemaInterfaceValueTypes[];

type SchemaInterface = {
  [k: string]: SchemaInterfaceValueTypes;
};

// * SchemaMap
type SchemaMapValueTypes =
  | Joi.StringSchema
  | Joi.NumberSchema
  | Joi.BooleanSchema
  | Joi.DateSchema
  | "Any"
  | SchemaMap
  | SchemaMapValueTypes[];

type TypeToJoiSchema<T extends SchemaInterfaceValueTypes> = T extends string
  ? Joi.StringSchema
  : T extends number
  ? Joi.NumberSchema
  : T extends boolean
  ? Joi.BooleanSchema
  : T extends Date
  ? Joi.DateSchema
  : T extends SchemaInterface
  ? SchemaMap<T>
  : T extends Array<infer U>
  ? [U] extends [SchemaInterfaceValueTypes]
    ? TypeToJoiSchema<U>[]
    : SchemaMapValueTypes[]
  : "Any";

type SchemaMap<T extends SchemaInterface = any> = {
  [x in keyof T]: TypeToJoiSchema<T[x]> | "Any";
};

type ParsedSchema = {
  [k: string]: Joi.AnySchema;
};

export { SchemaInterface, SchemaMap, SchemaMapValueTypes, ParsedSchema };
