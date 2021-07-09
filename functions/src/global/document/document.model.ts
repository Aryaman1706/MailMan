import { DocumentRef, DocumentSnap, DocumentData } from "./document.types";

class DocumentModel<ModelType extends DocumentData> {
  constructor(private documentRef: DocumentRef<ModelType>) {}

  get id() {
    return this.documentRef.id;
  }

  get collection() {
    return this.documentRef.parent.id;
  }

  public data = async () => {
    try {
      const documentSnap: DocumentSnap<ModelType> =
        await this.documentRef.get();

      const documentData = documentSnap.data();
      if (typeof documentData === undefined || !documentSnap.exists) {
        return undefined;
      }

      return documentData;
    } catch (error) {
      throw error;
    }
  };
}

export default DocumentModel;
