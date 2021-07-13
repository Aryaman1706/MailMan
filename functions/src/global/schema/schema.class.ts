import { isJoiSchema } from "./utils/misc";
import { parseAny, parseArray, parseMapAndFlatten } from "./utils/parsers";

import {
  SchemaInterface,
  SchemaMap,
  SchemaMapValueTypes,
  ParsedSchema,
} from "./schema.types";

class Schema<T extends SchemaInterface = any> {
  private __parsedSchema: ParsedSchema = {};

  constructor(schema: SchemaMap<T>) {
    // * Parsing
    Object.keys(schema).forEach((key) => {
      const val: SchemaMapValueTypes = schema[key];
      if (isJoiSchema(val)) {
        this.__parsedSchema[key] = val;
      } else if (val === "Any") {
        this.__parsedSchema[key] = parseAny();
      } else if (Array.isArray(val)) {
        parseArray(val);
      } else {
        this.__parsedSchema = {
          ...this.__parsedSchema,
          ...parseMapAndFlatten(`__${key}`, val),
        };
      }
    });
  }

  get schema(): ParsedSchema {
    return this.__parsedSchema;
  }
}

export { Schema };
