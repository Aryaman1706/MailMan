import { db, collections } from "../../config/firebase";

// Types
import { firestore } from "firebase-admin";
import { MailListDocumentData } from "../types";

type MailListDocData = Pick<
  MailListDocumentData,
  "active" | "complete" | "lastSent"
>;

const getActive = async (): Promise<{
  error: string | null;
  active: boolean | null;
  lastSent: firestore.Timestamp | null;
}> => {
  try {
    const activeMailLists = (await db
      .collection(collections.mailList)
      .select("active", "complete", "lastSent")
      .where("active", "==", true)
      .limit(2)
      .get()) as firestore.QuerySnapshot<MailListDocData>;

    console.log(activeMailLists.docs.map((doc) => doc.data()));

    if (activeMailLists.empty || activeMailLists.size === 0) {
      const completedMailLists = (await db
        .collection(collections.mailList)
        .select("active", "complete", "lastSent")
        .where("complete", "==", true)
        .orderBy("lastSent", "desc")
        .limit(1)
        .get()) as firestore.QuerySnapshot<MailListDocData>;

      if (completedMailLists.empty) {
        return {
          error: null,
          active: true,
          lastSent: null,
        };
      }

      return {
        error: null,
        active: true,
        lastSent: completedMailLists.docs[0].data().lastSent,
      };
    }

    if (activeMailLists.size > 1) {
      // TODO
      return {
        error: "More than one active mail list.",
        active: null,
        lastSent: null,
      };
    }

    return {
      error: null,
      active: false,
      lastSent: null,
    };
  } catch (error) {
    console.error(error);

    return {
      error: "Error while reading from database.",
      active: null,
      lastSent: null,
    };
  }
};

export default getActive;
