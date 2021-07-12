import { db } from "../../config/firebase";
import validation from "../../utils/functions/joiValidation";
import DocumentModel from "../document/document.model";
import { SchemaValidationError } from "./collection.utils";

import { ObjectSchema } from "joi";
import { CollectionRef } from "./collection.types";
import { DocumentData } from "../document/document.types";

class CollectionModel<ModelType extends DocumentData> {
  private __collectionRef: CollectionRef<ModelType>;

  constructor(public name: string, private __schema: ObjectSchema) {
    this.__collectionRef = db.collection(this.name) as CollectionRef<ModelType>;
  }

  public create = async (data: ModelType) => {
    try {
      const value = validation<ModelType>(this.__schema, data);
      if (typeof value === "string") {
        throw new SchemaValidationError(value);
      }

      const documentRef = await this.__collectionRef.add(value);
      new DocumentModel<ModelType>(documentRef);
    } catch (error) {
      //
    }
  };
}

export default CollectionModel;
