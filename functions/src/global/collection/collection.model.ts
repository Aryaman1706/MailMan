import { db } from "../../config/firebase";
import validation from "../../utils/functions/joiValidation";
import DocumentModel from "../document/document.model";

import { ObjectSchema } from "joi";
import { CollectionRef } from "./collection.types";
import { DocumentData } from "../document/document.types";

class CollectionModel<ModelType extends DocumentData> {
  private collectionRef: CollectionRef<ModelType>;

  constructor(public name: string, private schema: ObjectSchema) {
    this.collectionRef = db.collection(this.name) as CollectionRef<ModelType>;
  }

  public create = async (data: ModelType) => {
    try {
      const value = validation<ModelType>(this.schema, data);
      if (typeof value === "string") {
        throw value;
      }

      const documentRef = await this.collectionRef.add(value);
      new DocumentModel<ModelType>(documentRef);
    } catch (error) {
      //
    }
  };
}

export default CollectionModel;
