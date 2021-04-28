import { Request, Response } from "express";
import isEqual from "lodash.isequal";
import pick from "lodash.pick";
import { db, collections, bucket } from "../config/firebase";
import {
  UploadedFile,
  TemplateData,
  TemplateDocumentData,
  MailListData,
} from "./customTypes";
import parse from "../utils/parse";

// * Utils
import * as validators from "../utils/validators/mail";
import { firestore } from "firebase-admin";

// * Create new template with mailLists
export const newTemplate = async (req: Request, res: Response) => {
  try {
    // Validating req.body
    const { value, error } = validators.sendMails(req.body);
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
    const fileName: string = (req.file as UploadedFile).name;

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
    const templateData: TemplateData = {
      ...value,
      file: fileName,
      date: firestore.Timestamp.fromDate(new Date()),
      active: false,
      complete: false,
    };
    const activeTemplates = (await db
      .collection(collections.template)
      .where("active", "==", true)
      .get()) as firestore.QuerySnapshot<TemplateDocumentData>;

    if (activeTemplates.empty || activeTemplates.docs.length === 0) {
      templateData.active = true;
    }
    if (activeTemplates.docs.length > 1) {
      // TODO handle multiple active templates
      console.log("Multiple active templates found.");
      return;
    }
    const templateRef = await db
      .collection(collections.template)
      .add(templateData);

    // Save emailList in DB
    const batch = db.batch();
    let currentDate = new Date();

    emailList.forEach((sect, index) => {
      const docData: MailListData = {
        templateId: templateRef.id,
        sent: false,
        date: firestore.Timestamp.fromDate(currentDate),
        list: sect,
        last: Boolean(index === emailList.length - 1),
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

// * Get all templates
export const listTemplates = async (_req: Request, res: Response) => {
  try {
    type PartialTemplateData = Omit<TemplateData, "html" | "file">;
    interface PartialTemplateDocumentData
      extends firestore.DocumentData,
        PartialTemplateData {}

    // Getting all templates
    const templates = (await db
      .collection(collections.template)
      .orderBy("date", "desc")
      .select("subject", "date", "active", "complete")
      .get()) as firestore.QuerySnapshot<PartialTemplateDocumentData>;

    const templateDocs = templates.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
      date: doc.data().date.toDate(),
    }));

    return res.status(200).json({
      body: {
        msg: "Template List found.",
        data: templateDocs,
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

// * Open a template
export const openTemplate = async (req: Request, res: Response) => {
  try {
    // Find valid template document
    const template = (await db
      .collection(collections.template)
      .doc(req.params.id)
      .get()) as firestore.DocumentSnapshot<TemplateDocumentData>;

    if (!template.exists || !template.data()) {
      return res.status(404).json({
        body: null,
        error: {
          msg: "Template not found.",
          data: null,
        },
      });
    }

    return res.status(200).json({
      body: {
        msg: "Template found.",
        data: {
          ...template.data(),
          date: template.data()?.date.toDate(),
          id: template.id,
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

// * Edit a template
export const editTemplate = async (req: Request, res: Response) => {
  try {
    // Validating request body
    const { value, error } = validators.editTemplate(req.body);
    if (error)
      return res.status(400).json({
        body: null,
        error: {
          msg: "Invalid inputs. Try again.",
          data: error.details[0].message,
        },
      });

    // Finding valid template
    const template = (await db
      .collection(collections.template)
      .doc(req.params.id)
      .get()) as firestore.DocumentSnapshot<TemplateDocumentData>;

    const templateData = template.data();
    if (!template.exists || !templateData) {
      return res.status(404).json({
        body: null,
        error: {
          msg: "Template not found.",
          data: null,
        },
      });
    }

    // Validating changes
    if (isEqual(value, pick(templateData, [...Object.keys(value)]))) {
      return res.status(400).json({
        body: null,
        error: {
          msg: "No changes were made. Try again.",
          data: null,
        },
      });
    }

    // Updating template document
    const newTemplateData = {
      ...templateData,
      ...value,
    };
    await template.ref.update({
      ...value,
    });

    return res.status(200).json({
      body: {
        msg: "Template updated successfully.",
        data: newTemplateData,
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

// * Upload image to HTML mail template
export const uploadImage = async (req: Request, res: Response) => {
  try {
    // Get file
    const fileName = (req.file as UploadedFile).name;
    const file = bucket.file(fileName);

    // Validating file
    const fileExists = (await file.exists())[0];
    if (!fileExists) {
      return res.status(400).json({
        error: {
          message: "File not found. Try again",
        },
      });
    }

    // Make file public
    await file.makePublic();

    // Get publicUrl
    const fileURL = file.publicUrl();

    return res.status(200).json({
      url: fileURL,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: {
        message: "Internal server error. Try again.",
      },
    });
  }
};
