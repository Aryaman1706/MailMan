import { firestore } from "firebase-admin";
import { types as TemplateTypes } from "../template";

interface MailListItemData {
  templateId: string;
  mailListId: string;
  list: TemplateTypes.Format[];
  sent: boolean;
  date: firestore.Timestamp;
  last: boolean;
}

interface MailListItemDocumentData
  extends firestore.DocumentData,
    MailListItemData {}

export { MailListItemData, MailListItemDocumentData };
