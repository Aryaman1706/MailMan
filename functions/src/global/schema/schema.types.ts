import Joi from "joi";

type ValidTypes = string | number | boolean | Date;

type ValidSchemaTypes = ValidTypes | SchemaInterface | ValidSchemaTypes[];

type SchemaInterface = {
  [k: string]: ValidSchemaTypes;
};

type TypeToJoiSchema<T extends ValidSchemaTypes> = T extends string
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
  ? [U] extends [ValidSchemaTypes]
    ? TypeToJoiSchema<U>[]
    : ValidJoiType<any>[]
  : "Any";

type ValidJoiType<T extends SchemaInterface> =
  | Joi.StringSchema
  | Joi.NumberSchema
  | Joi.BooleanSchema
  | Joi.DateSchema
  | "Any"
  | SchemaMap<T>
  | ValidJoiType<T>[];

type SchemaMap<T extends SchemaInterface> = {
  [x in keyof T]: TypeToJoiSchema<T[x]>;
};

// Test
type DemoInterface = {
  keyString: string;
  keyMap: {
    subKeyString: string;
    subKeyMap: {
      subSubKeyDate: Date;
    };
  };
  keyArray: (string | { arrayKey: string })[];
  keyArrayOfArrays: { nestedArray1: number }[][];
};

const test: SchemaMap<DemoInterface> = {
  keyString: Joi.string(),
  keyMap: {
    subKeyString: Joi.string(),
    subKeyMap: {
      subSubKeyDate: Joi.date(),
    },
  },
  keyArray: [{ arrayKey: Joi.string() }, Joi.string()],
  keyArrayOfArrays: [[{ nestedArray1: Joi.number() }]],
};
console.log(test);

export { SchemaInterface, SchemaMap };
