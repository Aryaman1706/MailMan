import { db, collections } from "../../config/firebase";

// Types
import { firestore } from "firebase-admin";
import { MailListDocumentData } from "../types";

const getActive = async (): Promise<{
  error: string | null;
  active: boolean | null;
}> => {
  try {
    const activeTemplates = (await db
      .collection(collections.mailList)
      .where("active", "==", true)
      .get()) as firestore.QuerySnapshot<MailListDocumentData>;

    if (activeTemplates.empty || activeTemplates.size === 0) {
      return { error: null, active: true };
    }

    if (activeTemplates.size > 1) {
      return {
        error: "More than one active mail list.",
        active: null,
      };
    }

    return {
      error: null,
      active: false,
    };
  } catch (error) {
    console.error(error);

    return {
      error: "Error while reading from database.",
      active: null,
    };
  }
};

export default getActive;
