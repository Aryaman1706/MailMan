import { firestore } from "firebase-admin";
import { EmailListItem } from "../utils/functions/parse";

export interface MailListItemData {
  templateId: string;
  mailListId: string;
  list: EmailListItem[];
  sent: boolean;
  date: firestore.Timestamp;
  last: boolean;
}

export interface MailListItemDocumentData
  extends firestore.DocumentData,
    MailListItemData {}
