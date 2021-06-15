import { firestore } from "firebase-admin";

type Format = {
  email: string;
  [k: string]: string;
};
interface TemplateData {
  title: string;
  subject: string;
  html: string;
  attachments: string[];
  format: Format;
  date: firestore.Timestamp;
}

interface TemplateDocumentData extends firestore.DocumentData, TemplateData {}

export { Format, TemplateData, TemplateDocumentData };
