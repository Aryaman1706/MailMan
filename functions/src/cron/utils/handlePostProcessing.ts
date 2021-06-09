import { db } from "../../config/firebase";

import { firestore } from "firebase-admin";
import { types as mailListTypes } from "../../mailList";
import { types as mailListItemTypes } from "../../mailListItem";

type Input = {
  activeMailList: firestore.QueryDocumentSnapshot<mailListTypes.MailListDocumentData>;
  pendingMailListItemDocs: firestore.QueryDocumentSnapshot<mailListItemTypes.MailListItemDocumentData>[];
  inactiveMailLists: firestore.QueryDocumentSnapshot<mailListTypes.MailListDocumentData>[];
};

const handlePostProcessing = async ({
  activeMailList,
  pendingMailListItemDocs,
  inactiveMailLists,
}: Input) => {
  try {
    const writeBatch = db.batch();

    console.info("marking all docs in pendingMailListItemDocs as sent.");
    pendingMailListItemDocs.forEach((doc) => {
      writeBatch.update(doc.ref, {
        sent: true,
        sentOn: firestore.Timestamp.now(),
      });
    });

    const wasLastMailItemSent = pendingMailListItemDocs.find(
      (doc) => doc.data().last === true
    );
    console.info({
      wasLastMailItemSent: wasLastMailItemSent
        ? { ...wasLastMailItemSent.data(), list: undefined }
        : false,
    });

    if (wasLastMailItemSent) {
      console.info("marking activeMailList as complete.");
      writeBatch.update(activeMailList.ref, {
        active: false,
        complete: true,
        lastSent: firestore.Timestamp.now(),
      });

      if (inactiveMailLists.length > 0 && inactiveMailLists[0]) {
        console.info("marking 1st item in inactiveMailLists to be active");
        writeBatch.update(inactiveMailLists[0].ref, {
          active: true,
          lastSent: firestore.Timestamp.now(),
        });
      }
    } else {
      console.info("updating lastSent of activeMailList.");
      writeBatch.update(activeMailList.ref, {
        lastSent: firestore.Timestamp.now(),
      });
    }

    await writeBatch.commit();
  } catch (error) {
    throw error;
  }
};

export default handlePostProcessing;
