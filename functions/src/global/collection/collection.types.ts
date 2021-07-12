import { firestore } from "firebase-admin";

type CollectionRef<T> = firestore.CollectionReference<T>;
enum CollectionErrorType {
  SchemaValidationError = "Schema validation failed",
}

export { CollectionRef, CollectionErrorType };
