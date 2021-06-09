import { db, collections } from "../../config/firebase";

import { firestore } from "firebase-admin";
import { types as mailListTypes } from "../../mailList";
import { types as mailListItemTypes } from "../../mailListItem";

const getPendingMailListItems = async (
  activeMailList: firestore.QueryDocumentSnapshot<mailListTypes.MailListDocumentData>
) => {
  try {
    const pendingMailListItems = (await db
      .collection(collections.mailListItem)
      .where("mailListId", "==", activeMailList.id)
      .where("sent", "==", false)
      .orderBy("index", "desc")
      .get()) as firestore.QuerySnapshot<mailListItemTypes.MailListItemDocumentData>;

    console.info({
      pendingMailListItems: pendingMailListItems.docs.forEach((doc) => ({
        id: doc.id,
        index: doc.data().index,
        last: doc.data().last,
      })),
    });

    if (pendingMailListItems.empty) {
      console.info("No pendingMailListItems found for activeMailList.");
      return [];
    }

    // Selecting at max 2 pendingMailListItems
    const pendingMailListItemDocs = pendingMailListItems.docs.slice(0, 2);

    return pendingMailListItemDocs;
  } catch (error) {
    throw error;
  }
};

export default getPendingMailListItems;
