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

    // Validating templateId
    const templateSnap = await db
      .collection(collections.template)
      .doc(value.templateId)
      .get();
    const templateData = templateSnap.data() as
      | templateTypes.TemplateDocumentData
      | undefined;

    if (!templateSnap.exists || !templateData) {
      return res.status(400).json({
        body: null,
        error: {
          msg: "Invalid template.",
          data: null,
        },
      });
    }

    // Validating req.user
    if (!req.user)
      return res.status(400).json({
        body: null,
        error: {
          msg: "Invalid account.",
          data: null,
        },
      });

    // Validating user account
    const userAccount = await auth
      .getUser(req.user.id)
      .then((ur) => ur)
      .catch((err: Error) => err.message);

    if (typeof userAccount === "string" || !userAccount.email)
      return res.status(400).json({
        body: null,
        error: {
          msg: "Invalid account.",
          data: null,
        },
      });

    // Constructing mailListData
    const mailListData: MailListData = {
      template: {
        subject: templateData.subject,
        html: templateData.html,
        attachements: templateData.attachements,
      },
      email: userAccount.email,
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
    return res.status(500).json({
      body: null,
      error: {
        msg: "Request failed. Try again.",
        data: null,
      },
    });
  }
};
