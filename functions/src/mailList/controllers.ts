import { firestore } from "firebase-admin";
import { db, collections } from "../config/firebase";

// * Types
import Request from "../utils/types/CustomRequest";
import { Response } from "express";
import { MailListData, MailListDocumentData } from "./types";
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
import findMailListItems from "./utils/findMailListItems";

// * Add a new mailList
const addNew = async (
  req: Request<validators.AddMailListBody>,
  res: Response
) => {
  try {
    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
      return sendResponse(res, 400, "Please upload a file.");
    }
    const fileName = (req.files[0] as UploadedFile).name;

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
    if (activeError || active === null) {
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

const listMailList = async (req: Request, res: Response) => {
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
      id: doc.id,
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

const listMailListUser = async (req: Request, res: Response) => {
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
      id: doc.id,
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

const viewMailList = async (req: Request, res: Response) => {
  try {
    const mailList = (await db
      .collection(collections.mailList)
      .doc(req.params.id)
      .get()) as firestore.DocumentSnapshot<MailListDocumentData>;
    if (!mailList.exists) {
      return sendResponse(res, 400, "Mail List not found.");
    }

    const mailListData = mailList.data();
    if (!mailListData) {
      return sendResponse(res, 400, "Mail List document is empty.");
    }

    const { error, data } = await findMailListItems(mailList.id);
    if (error || !data) {
      return sendResponse(res, 400, error || "Unable to find.");
    }

    return sendResponse(res, 200, null, {
      msg: "MailList and related documents found.",
      data: {
        mailList: {
          ...mailListData,
          addedOn: mailListData.addedOn.toDate(),
          lastSent: mailListData.lastSent?.toDate() || null,
        },
        sent: data.sent,
        unsent: data.unsent,
      },
    });
  } catch (error) {
    console.error(error);
    return serverErrorResponse(res);
  }
};

export { addNew, listMailList, listMailListUser, viewMailList };
