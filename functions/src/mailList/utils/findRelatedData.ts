import { collections, db, auth } from "../../config/firebase";

// Types
import { firestore, auth as authType } from "firebase-admin";
import { types as templateTypes } from "../../template";
import { types as userTypes } from "../../user";

enum Type {
  template = "template",
  auth = "auth",
  user = "user",
}

class CustomError {
  constructor(private type: Type, private message: string) {}

  public toObject = () => {
    return {
      type: this.type,
      message: this.message,
    };
  };
}

type ReturnData = {
  error: string | null;
  data:
    | [
        string,
        templateTypes.TemplateDocumentData,
        authType.UserRecord,
        userTypes.UserProfileDocumentData
      ]
    | null;
};

const findNValidate = async (
  templateId: string,
  userId: string
): Promise<ReturnData> => {
  try {
    const [templateSnap, userRecord, userSnap] = await Promise.all([
      db
        .collection(collections.template)
        .doc(templateId)
        .get()
        .catch(() => {
          throw new CustomError(Type.template, "Template not found.");
        }),
      auth.getUser(userId).catch(() => {
        throw new CustomError(Type.auth, "Invalid user account.");
      }),
      db
        .collection(collections.user)
        .doc(userId)
        .get()
        .catch(() => {
          throw new CustomError(Type.user, "User document not found.");
        }),
    ]);

    if (!templateSnap.exists) {
      throw new CustomError(Type.template, "Template not found.");
    }

    const templateData = (
      templateSnap as firestore.DocumentSnapshot<templateTypes.TemplateDocumentData>
    ).data();

    if (!templateData) {
      throw new CustomError(Type.template, "Template is empty.");
    }

    if (!userRecord.email) {
      throw new CustomError(Type.user, "Email is missing from user account.");
    }

    if (!userSnap.exists) {
      throw new CustomError(Type.user, "User document does not exist.");
    }

    const userData = (
      userSnap as firestore.DocumentSnapshot<userTypes.UserProfileDocumentData>
    ).data();

    if (!userData) {
      throw new CustomError(Type.user, "User is empty.");
    }

    if (!userData.smtp || !userData.smtp.email || !userData.smtp.password) {
      throw new CustomError(Type.user, "SMTP information missing.");
    }

    return {
      error: null,
      data: [templateSnap.id, templateData, userRecord, userData],
    };
  } catch (error) {
    if (error instanceof CustomError) {
      return {
        error: error.toObject().message,
        data: null,
      };
    }

    throw error;
  }
};

export default findNValidate;
