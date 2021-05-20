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
  template: template;
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
