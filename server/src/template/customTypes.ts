import { firestore } from "firebase-admin";

export interface TemplateData {
  title: string;
  subject: string;
  html: string;
  attachements: string[];
  format: { email: string; [k: string]: string };
  date: firestore.Timestamp;
}

export interface TemplateDocumentData
  extends firestore.DocumentData,
    TemplateData {}
