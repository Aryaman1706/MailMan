import { Request, Response } from "express";
import { db, collections } from "../config/firebase";
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

    // Parse the xlsx

    // Save mail template to DB
    db.collection(collections.template).add({ ...value });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      body: null,
      error: {
        msg: "Request failed. Try again.",
        data: null,
      },
    });
  }
};
