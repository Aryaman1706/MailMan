import { CollectionErrorType } from "./collection.types";

class CollectionError extends Error {
  constructor(errorType: CollectionErrorType, msg: string) {
    super(`${errorType}. ${msg.trim()}`);

    Object.setPrototypeOf(this, CollectionError.prototype);
  }
}

class SchemaValidationError extends CollectionError {
  constructor(msg: string) {
    super(CollectionErrorType.SchemaValidationError, msg);
  }
}

export { SchemaValidationError };
