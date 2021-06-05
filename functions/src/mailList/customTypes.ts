import { firestore } from "firebase-admin";

export interface UploadedFile extends Express.Multer.File {
  name: string;
}

type template = {
  title: string;
  subject: string;
  html: string;
  attachements: string[];
};

export interface MailListData {
  templateId: string;
  template: template;
  email: string;
  uid: string;
  file: string;
  addedOn: firestore.Timestamp;
  active: boolean;
  complete: boolean;
  lastSent: firestore.Timestamp | null;
}

export interface MailListDocumentData
  extends firestore.DocumentData,
    MailListData {}
