import { db, collections } from "../../config/firebase";

import { firestore } from "firebase-admin";
import { types as mailListTypes } from "../../mailList";

type ReturnArray = [
  firestore.QueryDocumentSnapshot<mailListTypes.MailListDocumentData> | null,
  firestore.QueryDocumentSnapshot<mailListTypes.MailListDocumentData>[],
  firestore.QueryDocumentSnapshot<mailListTypes.MailListDocumentData>[]
];

const getActiveMailList = async (): Promise<ReturnArray> => {
  try {
    const incompleteMailLists = (await db
      .collection(collections.mailList)
      .where("complete", "==", false)
      .orderBy("addedOn", "asc")
      .get()) as firestore.QuerySnapshot<mailListTypes.MailListDocumentData>;

    console.info({
      incompleteMailLists: incompleteMailLists.docs.forEach((doc) => doc.id),
    });

    if (incompleteMailLists.empty || incompleteMailLists.size === 0) {
      console.info("incompleteMailLists is empty.");
      return [null, [], []];
    }

    const activeMailLists = incompleteMailLists.docs.filter((doc) =>
      Boolean(doc.data().active)
    );
    const inactiveMailLists = incompleteMailLists.docs.filter(
      (doc) => !Boolean(doc.data().active)
    );

    // If more than one mailList is active at same time
    // then set the oldest one to be active and rest as inactive
    if (activeMailLists.length > 1) {
      // TODO
      // mark 0th to be active
      // mark rest to be inactive
      // shift 1st to nth items to inactiveMailLists
      // sort inactiveMailLists on addedOn ascending
      console.info("Multiple activeMailLists found.");
      return [null, activeMailLists, inactiveMailLists];
    }

    let activeMailList = activeMailLists.length > 0 ? activeMailLists[0] : null;

    // If activeMailLists is empty
    // then set the first mailList in inactiveMailList to be active if present
    if (!activeMailList) {
      console.info("activeMailLists is empty.");

      if (inactiveMailLists.length > 0) {
        console.info("marking first item in inactiveMailLists to be active");
        await inactiveMailLists[0].ref.update({
          active: true,
        });

        activeMailList = inactiveMailLists[0];

        inactiveMailLists.splice(0, 1);
        activeMailLists[0] = activeMailList;
      } else {
        console.info("inactiveMailLists is also empty.");
        return [null, activeMailLists, inactiveMailLists];
      }
    }

    return [activeMailList, activeMailLists, inactiveMailLists];
  } catch (error) {
    throw error;
  }
};

export default getActiveMailList;
