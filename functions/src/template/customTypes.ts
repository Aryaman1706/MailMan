import { firestore } from "firebase-admin";

export type format = {
  email: string;
  [k: string]: string;
};
export interface TemplateData {
  title: string;
  subject: string;
  html: string;
  attachements: string[];
  format: format;
  date: firestore.Timestamp;
}

export interface TemplateDocumentData
  extends firestore.DocumentData,
    TemplateData {}
