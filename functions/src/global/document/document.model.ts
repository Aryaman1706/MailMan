import { DocumentRef, DocumentSnap, DocumentData } from "./document.types";

class DocumentModel<ModelType extends DocumentData> {
  constructor(private __documentRef: DocumentRef<ModelType>) {}

  get id() {
    return this.__documentRef.id;
  }

  get collection() {
    return this.__documentRef.parent.id;
  }

  public data = async () => {
    try {
      const documentSnap: DocumentSnap<ModelType> =
        await this.__documentRef.get();

      const documentData = documentSnap.data();
      if (!documentData || !documentSnap.exists) {
        return undefined;
      }

      return { __id: documentSnap.id, ...documentData };
    } catch (error) {
      throw error;
    }
  };

  public update = (_data: Partial<ModelType>) => {
    try {
    } catch (error) {}
  };

  public delete = async () => {
    try {
      await this.__documentRef.delete();
    } catch (error) {
      //
    }
  };
}

export default DocumentModel;
