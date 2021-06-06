import { db, collections } from "../../config/firebase";

import Request from "../../utils/types/CustomRequest";
import { Response } from "express";
import { firestore } from "firebase-admin";
import { MailListItemDocumentData } from "../types";
import { types as mailListTypes } from "../../mailList";
import { types as templateTypes } from "../../template";

import sendResponse, {
  serverErrorResponse,
} from "../../utils/functions/sendResponse";

const findMailListItems = async (mailListId: string, sent: boolean) => {
  const controller = async (_req: Request, res: Response) => {
    try {
      const mailList = (await db
        .collection(collections.mailList)
        .doc(mailListId)
        .get()) as firestore.DocumentSnapshot<mailListTypes.MailListDocumentData>;
      if (!mailList.exists) {
        return sendResponse(res, 404, "Invalid Mail List.");
      }

      const mailListData = mailList.data();
      if (!mailListData) {
        return sendResponse(res, 404, "Mail List is empty.");
      }

      const mailListItems = (await db
        .collection(collections.mailListItem)
        .where("mailListId", "==", mailList.id)
        .where("sent", "==", Boolean(sent))
        .select("list")
        .get()) as firestore.QuerySnapshot<
        Pick<MailListItemDocumentData, "list">
      >;

      if (mailListItems.empty) {
        return sendResponse(res, 400, "List is empty.");
      }

      const mailListItemsData: templateTypes.Format[] = [];
      mailListItems.docs.forEach((doc) => {
        mailListItemsData.push(...doc.data().list);
      });

      // Generate File

      return;
    } catch (error) {
      console.error(error);
      return serverErrorResponse(res);
    }
  };

  return controller;
};

export default findMailListItems;
