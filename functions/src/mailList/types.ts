import { firestore } from "firebase-admin";
import { types as TemplateTypes } from "../template";

type Template = Pick<
  TemplateTypes.TemplateData,
  "title" | "subject" | "html" | "attachments"
>;

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
