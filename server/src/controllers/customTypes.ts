import { firestore } from "firebase-admin";

export interface UploadedFile extends Express.Multer.File {
  name: string;
}

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

export interface MailListData {
  templateId: string;
  sent: boolean;
  date: firestore.Timestamp;
  list: Array<{ [key: string]: string }>;
  last: boolean;
}

export interface MailListDocumentData
  extends firestore.DocumentData,
    MailListData {}
