import { firestore } from "firebase-admin";

type Template = {
  title: string;
  subject: string;
  html: string;
  attachements: string[];
};

interface MailListData {
  templateId: string;
  template: Template;
  email: string;
  uid: string;
  file: string;
  addedOn: firestore.Timestamp;
  active: boolean;
  complete: boolean;
  lastSent: firestore.Timestamp | null;
}

interface MailListDocumentData extends firestore.DocumentData, MailListData {}

export { MailListData, MailListDocumentData };
