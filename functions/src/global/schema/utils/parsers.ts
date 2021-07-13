import Joi from "joi";
import { isJoiSchema } from "./misc";

import { SchemaMap, SchemaMapValueTypes, ParsedSchema } from "../schema.types";

const parseAny = (): Joi.AnySchema => {
  return Joi.any();
};

const parseMap = (map: SchemaMap): Joi.ObjectSchema => {
  const keys: { [k in keyof SchemaMap]: Joi.AnySchema } = {};

  Object.keys(map).forEach((key) => {
    const val = map[key];
    if (isJoiSchema(val)) {
      keys[key] = val;
    } else if (val === "Any") {
      keys[key] = parseAny();
    } else if (Array.isArray(val)) {
      keys[key] = parseArray(val);
    } else {
      keys[key] = parseMap(val);
    }
  });

  return Joi.object().keys(keys);
};

const parseMapAndFlatten = (
  parentKey: string,
  map: SchemaMap
): ParsedSchema => {
  let flatSchema: ParsedSchema = {};

  Object.keys(map).forEach((key) => {
    const val = map[key];
    if (isJoiSchema(val)) {
      flatSchema[`${parentKey}:${key}`] = val;
    } else if (val === "Any") {
      flatSchema[`${parentKey}:${key}`] = parseAny();
    } else if (Array.isArray(val)) {
      flatSchema[`${parentKey}:${key}`] = parseArray(val);
    } else {
      flatSchema = { ...flatSchema, ...parseMapAndFlatten(key, val) };
    }
  });

  return flatSchema;
};

const parseArray = (arr: SchemaMapValueTypes[]): Joi.ArraySchema => {
  if (arr.length === 0) {
    return Joi.array();
  }

  const validArrItems: Joi.AnySchema[] = [];

  arr.forEach((item) => {
    if (isJoiSchema(item)) {
      validArrItems.push(item);
    } else if (item === "Any") {
      validArrItems.push(parseAny());
    } else if (Array.isArray(item)) {
      validArrItems.push(parseArray(item));
    } else {
      validArrItems.push(parseMap(item));
    }
  });

  return Joi.array().items(...validArrItems);
};

export { parseAny, parseArray, parseMapAndFlatten };
