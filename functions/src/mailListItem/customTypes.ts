import { firestore } from "firebase-admin";
import { EmailListItem } from "../utils/parse";

export interface MailListItemData {
  mailListId: string;
  list: EmailListItem[];
  sent: boolean;
  date: firestore.Timestamp;
  last: boolean;
}

export interface MailListItemDocumentData
  extends firestore.DocumentData,
    MailListItemData {}
