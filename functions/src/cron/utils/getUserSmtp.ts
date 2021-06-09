import { db, collections } from "../../config/firebase";

import { firestore } from "firebase-admin";
import { types as userTypes } from "../../user";

const getUserSmtp = async (uid: string) => {
  try {
    const userSnap = (await db
      .collection(collections.user)
      .doc(uid)
      .get()
      .catch((err: Error) => err.message)) as
      | firestore.DocumentSnapshot<userTypes.UserProfileDocumentData>
      | string;

    if (typeof userSnap === "string" || !userSnap.exists) {
      console.info("User account not found.");
      return null;
    }

    const userData = userSnap.data();

    if (
      !userData ||
      !userData.smtp ||
      !userData.smtp.email ||
      !userData.smtp.password
    ) {
      console.info("SMTP information missing.");
      return null;
    }

    return {
      email: userData.smtp.email,
      password: userData.smtp.password,
    };
  } catch (error) {
    throw error;
  }
};

export default getUserSmtp;
