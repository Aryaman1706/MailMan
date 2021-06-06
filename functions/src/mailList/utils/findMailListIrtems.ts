import { db, collections } from "../../config/firebase";

import { firestore } from "firebase-admin";
import { types as mailListItemTypes } from "../../mailListItem";

type MailListItemDocumentData = Pick<
  mailListItemTypes.MailListItemDocumentData,
  "list" | "sent" | "date"
>;

type MailListItemData = Pick<
  mailListItemTypes.MailListItemData,
  "list" | "sent"
> & { id: string; date: Date };

const findMailListItems = async (mailListId: string) => {
  try {
    const mailListItemList = (await db
      .collection(collections.mailListItem)
      .where("mailListId", "==", mailListId)
      .orderBy("date", "desc")
      .select("list", "sent", "date")
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
        date: doc.data().date.toDate(),
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
