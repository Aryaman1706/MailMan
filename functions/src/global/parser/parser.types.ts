import { SchemaInterface } from "../schema/schema.types";

interface SchemaType {
  type: "String" | "Number" | "Boolean" | "Any" | "Array" | "Map";
  required?: boolean;
}

interface StringType<T = string> extends SchemaType {
  type: "String";
  default?: T;
  minLength?: number;
  maxLength?: number;
  lowercase?: boolean;
  uppercase?: boolean;
  regex?: "email" | RegExp;
}

interface NumberType<T = number> extends SchemaType {
  type: "Number";
  default?: T;
  integer?: boolean;
  min?: number;
  max?: number;
}

interface BooleanType<T = boolean> extends SchemaType {
  type: "Boolean";
  default?: T;
}

interface AnyType<T = any> extends SchemaType {
  type: "Any";
  default?: T;
}

interface ArrayType<T = any[]> extends SchemaType {
  type: "Array";
  default?: T;
  items: RemoveDefault<SchemaTypesUnion>[];
  max?: number;
}

interface MapType<T = SchemaInterface> extends SchemaType {
  type: "Map";
  default?: T;
  keys?: {
    [k: string]: RemoveDefault<SchemaTypesUnion>;
  };
}

type SchemaTypesUnion =
  | StringType
  | NumberType
  | BooleanType
  | AnyType
  | ArrayType
  | MapType;

type RemoveDefault<U extends SchemaTypesUnion> = Omit<U, "default">;

export {
  StringType,
  NumberType,
  BooleanType,
  AnyType,
  ArrayType,
  MapType,
  SchemaTypesUnion,
};
