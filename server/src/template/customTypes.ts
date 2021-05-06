import { firestore } from "firebase-admin";

export interface TemplateData {
  html: string;
  subject: string;
  file: string;
  date: firestore.Timestamp;
  active: boolean;
  complete: boolean;
}

export interface TemplateDocumentData
  extends firestore.DocumentData,
    TemplateData {}
