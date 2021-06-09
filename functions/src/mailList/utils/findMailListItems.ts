import { db, collections } from "../../config/firebase";

import { firestore } from "firebase-admin";
import { types as mailListItemTypes } from "../../mailListItem";

type MailListItemDocumentData = Pick<
  mailListItemTypes.MailListItemDocumentData,
  "list" | "sent" | "sentOn"
>;

type MailListItemData = Pick<
  mailListItemTypes.MailListItemData,
  "list" | "sent"
> & { id: string; sentOn: Date | null };

const findMailListItems = async (mailListId: string) => {
  try {
    const mailListItemList = (await db
      .collection(collections.mailListItem)
      .where("mailListId", "==", mailListId)
      .select("list", "sent", "sentOn")
      .get()) as firestore.QuerySnapshot<MailListItemDocumentData>;

    if (mailListItemList.empty) {
      return {
        error: null,
        data: {
          sent: [],
          unsent: [],
        },
      };
    }

    const sentMailListItems: MailListItemData[] = [];
    const unsentMailListItems: MailListItemData[] = [];

    mailListItemList.docs.forEach((doc) => {
      const data: MailListItemData = {
        ...doc.data(),
        sentOn: doc.data().sentOn?.toDate() || null,
        id: doc.id,
      };

      doc.data().sent
        ? sentMailListItems.push(data)
        : unsentMailListItems.push(data);
    });

    return {
      error: null,
      data: {
        sent: sentMailListItems,
        unsent: unsentMailListItems,
      },
    };
  } catch (error) {
    console.error(error);

    return {
      error: "Unable to read from database",
      data: null,
    };
  }
};

export default findMailListItems;
