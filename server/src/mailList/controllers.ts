import { Request, Response } from "express";
import { firestore } from "firebase-admin";
import { db, collections } from "../config/firebase";

// * Utils
import * as validators from "../utils/validators/mailList";
import { MailListDocumentData } from "./customTypes";

// * Edit a mailList item
// export const editMailList = async (_req: Request, res: Response) => {
//   try {
//     //
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       body: null,
//       error: {
//         msg: "Request failed. Try again.",
//         data: null,
//       },
//     });
//   }
// };

// * List mailList for a template
export const listMailList = async (req: Request, res: Response) => {
  try {
    // Validating req.query
    const { value, error } = validators.listMailList(req.query);
    if (error)
      return res.status(400).json({
        body: null,
        error: {
          msg: "Invalid request.",
          data: error.details[0].message,
        },
      });

    // Paginated query for mailList
    const mailListItem = (await db
      .collection(collections.mailList)
      .where("templateId", "==", req.params.templateId)
      .orderBy("date", "asc")
      .offset(value.page)
      .limit(1)
      .get()) as firestore.QuerySnapshot<MailListDocumentData>;

    // Validating query result
    if (mailListItem.empty || mailListItem.docs.length === 0) {
      return res.status(200).json({
        body: {
          msg: "No result found.",
          data: {
            list: [],
            hasMore: false,
          },
        },
        error: null,
      });
    }

    if (mailListItem.docs.length > 1) {
      return res.status(400).json({
        body: null,
        error: {
          msg: "Inconsistency in the data.",
          data: null,
        },
      });
    }

    return res.status(200).json({
      body: {
        msg: "Result found.",
        data: {
          list: mailListItem.docs[0].data().list,
          hasMore: !Boolean(mailListItem.docs[0].data().last),
        },
      },
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
