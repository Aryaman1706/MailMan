import { firestore } from "firebase-admin";
import { db, collections } from "../config/firebase";

// * Types
import Request from "../utils/types/CustomRequest";
import { Response } from "express";
import { MailListData, MailListDocumentData } from "./types";
import { types as mailListItemTypes } from "../mailListItem";
import UploadedFile from "../utils/types/CustomReqFile";

// * Utils
import findRelatedData from "./utils/findRelatedData";
import getActive from "./utils/getActive";
import createMailListItems from "./utils/createMailListItems";
import * as validators from "./validators";
import sendResponse, {
  serverErrorResponse,
  validationErrorResponse,
} from "../utils/functions/sendResponse";

// * Add a new mailList
export const addNew = async (
  req: Request<validators.AddMailListBody>,
  res: Response
) => {
  try {
    if (!req.file) {
      return sendResponse(res, 400, "Please upload a file.");
    }
    const fileName = (req.file as UploadedFile).name;

    if (!req.user) {
      return sendResponse(res, 400, "Invalid account.");
    }

    // Finding valid template and user
    const { error: dbError, data } = await findRelatedData(
      req.body.templateId,
      req.user.id
    );
    if (dbError || !data) {
      return sendResponse(res, 400, dbError || "Relevant data not found.");
    }

    const [templateId, templateData, userRecord] = data;

    const mailListData: MailListData = {
      templateId,
      template: {
        title: templateData.title,
        subject: templateData.subject,
        html: templateData.html,
        attachements: templateData.attachements,
      },
      email: userRecord.email!,
      uid: userRecord.uid,
      file: fileName,
      addedOn: firestore.Timestamp.now(),
      active: false,
      complete: false,
      lastSent: null,
    };

    // Determining active status of new mailList
    const { error: activeError, active } = await getActive();
    if (activeError || !active) {
      return sendResponse(res, 400, activeError || "Undetermined data.");
    }

    mailListData.active = active;

    // Create mailListItems
    const mailListItemsError = await createMailListItems(
      fileName,
      templateData.format,
      mailListData
    );
    if (mailListItemsError) {
      return sendResponse(res, 400, "Unable to create.");
    }

    return sendResponse(res, 200, null, {
      msg: "Emails queued successfully.",
      data: {
        ...mailListData,
        addedOn: mailListData.addedOn.toDate(),
      },
    });
  } catch (error) {
    console.error(error);
    return serverErrorResponse(res);
  }
};

export const listMailList = async (req: Request, res: Response) => {
  try {
    const {
      error,
      value: { page },
    } = validators.pagination(req.query);
    if (error) {
      return validationErrorResponse(res, error);
    }

    const mailLists = (await db
      .collection(collections.mailList)
      .orderBy("addedOn", "desc")
      .offset(page * 10)
      .limit(10)
      .get()) as firestore.QuerySnapshot<MailListDocumentData>;

    const list = mailLists.docs.map((doc) => ({
      ...doc.data(),
      addedOn: doc.data().addedOn.toDate(),
    }));

    return sendResponse(res, 200, null, {
      msg: "MailList List found.",
      data: {
        list,
        hasMore: !mailLists.empty && mailLists.size > 10 ? true : false,
      },
    });
  } catch (error) {
    console.error(error);
    return serverErrorResponse(res);
  }
};

export const listMailListUser = async (req: Request, res: Response) => {
  try {
    const {
      error,
      value: { page },
    } = validators.pagination(req.query);
    if (error) {
      return validationErrorResponse(res, error);
    }

    if (!req.user) {
      return sendResponse(res, 400, "Invalid account.");
    }

    const mailLists = (await db
      .collection(collections.mailList)
      .where("uid", "==", req.user.id)
      .orderBy("addedOn", "desc")
      .offset(page * 10)
      .limit(10)
      .get()) as firestore.QuerySnapshot<MailListDocumentData>;

    const list = mailLists.docs.map((doc) => ({
      ...doc.data(),
      addedOn: doc.data().addedOn.toDate(),
    }));

    return sendResponse(res, 200, null, {
      msg: "MailList List found.",
      data: {
        list,
        hasMore: !mailLists.empty && mailLists.size > 10 ? true : false,
      },
    });
  } catch (error) {
    console.error(error);
    return serverErrorResponse(res);
  }
};

export const viewMailList = async (req: Request, res: Response) => {
  try {
    // Validate req.query
    const {
      error,
      value: { page },
    } = validators.pagination(req.query);
    if (error)
      return res.status(400).json({
        body: null,
        error: {
          msg: "Invalid inputs. Try again.",
          data: error.details[0].message,
        },
      });

    // Finding valid mailList
    const mailListDoc = (await db
      .collection(collections.mailList)
      .doc(req.params.mailListId)
      .get()) as firestore.DocumentSnapshot<MailListDocumentData>;
    const mailListDocData = mailListDoc.data();

    if (!mailListDoc.exists || !mailListDocData) {
      return res.status(400).json({
        body: null,
        error: {
          msg: "Mail List not found.",
          data: null,
        },
      });
    }

    // Verify User access
    if (
      !req.user ||
      (!req.user.isAdmin && req.user.id.trim() !== mailListDocData.uid.trim())
    ) {
      return res.status(400).json({
        body: null,
        error: {
          msg: "You do not have access to this mail list.",
          data: null,
        },
      });
    }

    // Find related mailListItems (paginated)
    const mailListItemDocs = (await db
      .collection(collections.mailListItem)
      .where("mailListId", "==", mailListDoc.id.trim())
      .orderBy("date", "asc")
      .offset(page * 10)
      .limit(10)
      .get()) as firestore.QuerySnapshot<mailListItemTypes.MailListItemDocumentData>;

    let isLast: boolean = false;
    const list = mailListItemDocs.docs.map((doc) => {
      if (doc.data().last) {
        isLast = true;
      }

      return {
        ...doc.data(),
        date: doc.data().date.toDate(),
      };
    });

    return res.status(200).json({
      body: {
        msg: "MailList List found.",
        data: {
          list,
          hasMore:
            !mailListItemDocs.empty && mailListItemDocs.size > 10 && !isLast
              ? true
              : false,
        },
      },
      error: null,
    });
  } catch (error) {
    console.error(error);
    return serverErrorResponse(res);
  }
};
