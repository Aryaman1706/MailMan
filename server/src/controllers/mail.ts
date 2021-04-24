import { Request, Response } from "express";
import { db, collections } from "../config/firebase";
import { UploadedFile } from "./customTypes";
import parse from "../utils/parse";

// * Utils
import { sendMails as sendMailsValidator } from "../utils/validators/mail";

export const sendMails = async (req: Request, res: Response) => {
  try {
    // Validating req.body
    const { value, error } = sendMailsValidator(req.body);
    if (error)
      return res.status(400).json({
        body: null,
        error: {
          msg: "Invalid inputs. Try again.",
          data: error.details[0].message,
        },
      });

    // Uploaded File processing
    if (!req.file) {
      return res.status(400).json({
        body: null,
        error: {
          msg: "File not uploaded",
          data: null,
        },
      });
    }
    const fileName = (req.file as UploadedFile).name;

    // Parse the xlsx
    const { emailList, trashList, error: fileError } = await parse(fileName);
    if (fileError) {
      return res.status(400).json({
        body: null,
        error: {
          msg: "Error in processing file. Try again.",
          data: fileError,
        },
      });
    }

    // Save mail template to DB
    const templateRef = await db
      .collection(collections.template)
      .add({ ...value });

    // Save emailList in DB
    const batch = db.batch();
    let currentDate = new Date();

    emailList.forEach((sect) => {
      const docData = {
        templateId: templateRef.id,
        sent: false,
        date: currentDate,
        list: sect,
      };
      batch.create(db.collection(collections.mailList).doc(), docData);

      // Updating date
      currentDate.setHours(
        currentDate.getHours() + 1,
        currentDate.getMinutes() + 10
      );
    });

    await batch.commit();

    return res.status(200).json({
      body: {
        msg: "Successfull. Mails have been added to pipeline.",
        data: trashList || null,
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
