import { Response } from "express";
import Request from "../utils/ReqUser";
import { firestore } from "firebase-admin";
import { db, collections, auth } from "../config/firebase";

// * Utils
import * as validators from "../utils/validators/mailList";
import parse from "../utils/parse";

// * Types
import {
  MailListData,
  UploadedFile,
  MailListDocumentData,
} from "./customTypes";
import { types as templateTypes } from "../template";
import { types as mailListItemTypes } from "../mailListItem";
import { types as userTypes } from "../user";

// * Add a new mailList
export const addNew = async (req: Request, res: Response) => {
  try {
    // Validate req.body
    const { value, error } = validators.addNew(req.body);
    if (error) {
      return res.status(400).json({
        body: null,
        error: {
          msg: "Invalid inputs. Try again.",
          data: error.details[0].message,
        },
      });
    }

    // Validating file
    const fileName = req.file ? (req.file as UploadedFile).name : null;
    if (!fileName)
      return res.status(400).json({
        body: null,
        error: {
          msg: "Please upload a file.",
          data: null,
        },
      });

    // Validating req.user
    if (!req.user)
      return res.status(400).json({
        body: null,
        error: {
          msg: "Invalid account.",
          data: null,
        },
      });

    // Finding template and userAccount
    const [templateSnap, userRecord, userSnap] = await Promise.all([
      db
        .collection(collections.template)
        .doc(value.templateId)
        .get()
        .catch((err: Error) => err.message),
      auth.getUser(req.user.id).catch((err: Error) => err.message),
      db
        .collection(collections.user)
        .doc(req.user.id)
        .get()
        .catch((err: Error) => err.message),
    ]);

    // Validating templateSnap
    if (typeof templateSnap === "string" || !templateSnap.exists) {
      throw {
        type: "template_error",
        error: templateSnap || "Template not found.",
      };
    }

    const templateData = templateSnap.data() as
      | templateTypes.TemplateDocumentData
      | undefined;

    // Validating template data
    if (!templateData) {
      throw {
        type: "template_error",
        error: "Invalid data in template.",
      };
    }

    // Validating userRecord
    if (typeof userRecord === "string" || !userRecord.email) {
      throw {
        type: "user_error",
        error: "Invalid user account.",
      };
    }

    // Validating userSnap
    if (typeof userSnap === "string" || !userSnap.exists) {
      throw {
        type: "user_error",
        error: userSnap || "User account not found.",
      };
    }

    // Validating userData
    const userData = userSnap.data() as
      | userTypes.UserProfileDocumentData
      | undefined;

    if (!userData) {
      throw {
        type: "user_error",
        error: "Invalid data in user account.",
      };
    }

    if (!userData.smtp || !userData.smtp.email || !userData.smtp.password) {
      throw {
        type: "user_error",
        error: "SMTP information missing in user.",
      };
    }

    // Constructing mailListData
    const mailListData: MailListData = {
      template: {
        title: templateData.title,
        subject: templateData.subject,
        html: templateData.html,
        attachements: templateData.attachements,
      },
      email: userRecord.email,
      uid: userRecord.uid,
      file: fileName,
      addedOn: firestore.Timestamp.now(),
      active: false,
      complete: false,
      lastSent: null,
    };

    // Determining active status of new MailList
    const activeTemplates = (await db
      .collection(collections.mailList)
      .where("active", "==", true)
      .get()) as firestore.QuerySnapshot<MailListDocumentData>;

    if (activeTemplates.empty || activeTemplates.size === 0) {
      mailListData.active = true;
    }

    if (activeTemplates.size > 1) {
      return res.status(400).json({
        body: null,
        error: {
          msg: "Multiple active Mail List found.",
          data: activeTemplates.docs,
        },
      });
    }

    // Add to db and parse excel file
    const [
      { id: newMailListId },
      { error: parsingError, emailList },
    ] = await Promise.all([
      db.collection(collections.mailList).add(mailListData),
      parse(fileName, templateData.format),
    ]);

    // Validating parsing
    if (parsingError)
      return res.status(400).json({
        body: null,
        error: {
          msg: "There was an error parsing your excel file. Try again.",
          data: parsingError,
        },
      });

    // Saving mailListItems to db
    const batch = db.batch();
    let currentDate = new Date();

    emailList.forEach((item, index) => {
      const data: mailListItemTypes.MailListItemData = {
        mailListId: newMailListId,
        list: item,
        sent: false,
        date: firestore.Timestamp.fromDate(currentDate),
        last: Boolean(index === emailList.length - 1),
      };
      batch.create(db.collection(collections.mailListItem).doc(), data);

      // Updating currentDate
      currentDate.setHours(
        currentDate.getHours() + 1,
        currentDate.getMinutes() + 10
      );
    });

    await batch.commit();

    return res.status(200).json({
      body: {
        msg: "Emails queued successfully.",
        data: {
          ...mailListData,
          addedOn: mailListData.addedOn.toDate(),
        },
      },
      error: null,
    });
  } catch (error) {
    console.error(error);

    if (error instanceof Error) {
      return res.status(500).json({
        body: null,
        error: {
          msg: "Request failed. Try again.",
          data: null,
        },
      });
    }

    return res.status(400).json({
      body: null,
      error: {
        msg: error?.error || "Invalid request. Try again.",
        data: null,
      },
    });
  }
};

export const listMailList = async (req: Request, res: Response) => {
  try {
    // Validate req.query
    const {
      error,
      value: { page },
    } = validators.listMailList(req.query);
    if (error)
      return res.status(400).json({
        body: null,
        error: {
          msg: "Invalid inputs. Try again.",
          data: error.details[0].message,
        },
      });

    // Paginated query
    const mailLists = (await db
      .collection(collections.mailList)
      .orderBy("addedOn", "desc")
      .limit(10)
      .offset(page * 10)
      .get()) as firestore.QuerySnapshot<MailListDocumentData>;

    const list = mailLists.docs.map((doc) => ({
      ...doc.data(),
      addedOn: doc.data().addedOn.toDate(),
    }));

    return res.status(200).json({
      body: {
        msg: "MailList List found.",
        data: {
          list,
          hasMore: !mailLists.empty && mailLists.size > 10 ? true : false,
        },
      },
      error: null,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      body: null,
      error: {
        msg: "Request failed. Try again.",
        data: null,
      },
    });
  }
};

export const listMailListUser = async (req: Request, res: Response) => {
  try {
    // Validate req.query
    const {
      error,
      value: { page },
    } = validators.listMailList(req.query);
    if (error)
      return res.status(400).json({
        body: null,
        error: {
          msg: "Invalid inputs. Try again.",
          data: error.details[0].message,
        },
      });

    // Determining req.user's id
    if (!req.user) {
      return res.status(400).json({
        body: null,
        error: {
          msg: "Invalid account.",
          data: null,
        },
      });
    }

    // Paginated query
    const mailLists = (await db
      .collection(collections.mailList)
      .where("uid", "==", req.user.id)
      .orderBy("addedOn", "desc")
      .limit(10)
      .offset(page * 10)
      .get()) as firestore.QuerySnapshot<MailListDocumentData>;

    const list = mailLists.docs.map((doc) => ({
      ...doc.data(),
      addedOn: doc.data().addedOn.toDate(),
    }));

    return res.status(200).json({
      body: {
        msg: "MailList List found.",
        data: {
          list,
          hasMore: !mailLists.empty && mailLists.size > 10 ? true : false,
        },
      },
      error: null,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      body: null,
      error: {
        msg: "Request failed. Try again.",
        data: null,
      },
    });
  }
};
