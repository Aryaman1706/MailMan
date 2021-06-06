import { db, collections } from "../../config/firebase";

import { MailListData } from "../types";
import { types as mailListItemTypes } from "../../mailListItem";
import { types as templateTypes } from "../../template";

import parse from "../../utils/functions/parse";
import { firestore } from "firebase-admin";

const createMailListItems = async (
  fileName: string,
  format: templateTypes.Format,
  mailListData: MailListData
) => {
  try {
    const [{ id: newMailListId }, { error: parsingError, emailList }] =
      await Promise.all([
        db.collection(collections.mailList).add(mailListData),
        parse(fileName, format),
      ]);

    if (parsingError) {
      return parsingError;
    }

    const batch = db.batch();
    let currentDate = new Date();

    emailList.forEach((item, index) => {
      const data: mailListItemTypes.MailListItemData = {
        templateId: mailListData.templateId,
        mailListId: newMailListId,
        list: item,
        sent: false,
        date: firestore.Timestamp.fromDate(currentDate),
        last: Boolean(index === emailList.length - 1),
      };
      batch.create(db.collection(collections.mailListItem).doc(), data);

      currentDate.setHours(
        currentDate.getHours() + 1,
        currentDate.getMinutes() + 10
      );
    });

    await batch.commit();

    return null;
  } catch (error) {
    console.error(error);
    return "Write to database failed.";
  }
};

export default createMailListItems;
