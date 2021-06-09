import { db, collections, bucket } from "../config/firebase";
import { v4 } from "uuid";
import juice from "juice";

// Types
import Request from "../utils/types/CustomRequest";
import { Response } from "express";
import { TemplateDocumentData } from "./types";
import { types as MailListTypes } from "../mailList";
import { types as MailListItemTypes } from "../mailListItem";
import { NewTemplateValid } from "./middlewares";
import UploadedFile from "../utils/types/CustomReqFile";

// Utils
import { firestore } from "firebase-admin";
import sendResponse, {
  serverErrorResponse,
} from "../utils/functions/sendResponse";
import writeFile from "../utils/functions/writeFile";
import readFile from "../utils/functions/readFile";
import styles from "../utils/styles";

// * Create new template
const newTemplate = async (req: Request<NewTemplateValid>, res: Response) => {
  try {
    let attachements: string[] = [];
    console.log(req.files);
    if (req.files && Array.isArray(req.files) && req.files.length > 0) {
      attachements = (req.files as UploadedFile[]).map((file) => file.name);
    }

    const fileName = `${v4()}.html`;
    const fileWriteStream = bucket.file(fileName).createWriteStream();

    const fileWriteResult = await writeFile(
      fileWriteStream,
      req.body.html
    ).catch((e: Error) => e.message);

    if (fileWriteResult && fileWriteResult === "error") {
      return sendResponse(res, 400, "Failed to write html to file");
    }

    const templateDocData: TemplateDocumentData = {
      title: req.body.title,
      subject: req.body.subject,
      html: fileName,
      attachements,
      format: req.body.format,
      date: firestore.Timestamp.now(),
    };

    await db.collection(collections.template).add(templateDocData);

    return sendResponse(res, 200, null, "New template added successfully.");
  } catch (error) {
    console.error(error);
    return serverErrorResponse(res);
  }
};

// * Get all templates
const listTemplates = async (_req: Request, res: Response) => {
  try {
    const templateListSnap = (await db
      .collection(collections.template)
      .select("title", "date", "format")
      .orderBy("date", "desc")
      .get()) as firestore.QuerySnapshot<
      Pick<TemplateDocumentData, "date" | "title" | "format">
    >;

    if (templateListSnap.empty || templateListSnap.docs.length === 0) {
      return sendResponse(res, 200, null, "No templates found");
    }

    const templateList = templateListSnap.docs.map((doc) => ({
      id: doc.id,
      title: doc.data().title,
      date: doc.data().date.toDate(),
      format: doc.data().format,
    }));

    return sendResponse(res, 200, null, {
      msg: "Template list found.",
      data: templateList,
    });
  } catch (error) {
    console.error(error);
    return serverErrorResponse(res);
  }
};

// * Open a template
const openTemplate = async (req: Request, res: Response) => {
  try {
    // Finding valid template document
    const template = (await db
      .collection(collections.template)
      .doc(req.params.id)
      .get()) as firestore.DocumentSnapshot<TemplateDocumentData>;

    if (!template.exists) {
      return sendResponse(res, 404, "Template not found.");
    }

    const templateData = template.data();
    if (!templateData) {
      return sendResponse(res, 400, "Template is empty.");
    }

    // Read html file
    const htmlReadStream = bucket.file(templateData.html).createReadStream();
    const htmlString = await readFile(htmlReadStream).catch(
      (err: Error) => err
    );

    if (typeof htmlString !== "string") {
      return sendResponse(res, 400, {
        msg: "Error in reading html file.",
        data: htmlString.message,
      });
    }

    return sendResponse(res, 200, null, {
      msg: "Template found.",
      data: {
        ...template.data(),
        html: juice.inlineContent(htmlString, styles),
        date: template.data()?.date.toDate(),
        id: template.id,
      },
    });
  } catch (error) {
    console.error(error);
    return serverErrorResponse(res);
  }
};

// * Delete a template
const deleteTemplate = async (req: Request, res: Response) => {
  try {
    const templateSnap = (await db
      .collection(collections.template)
      .doc(req.params.id)
      .get()) as firestore.DocumentSnapshot<TemplateDocumentData>;
    if (!templateSnap.exists) {
      return sendResponse(res, 404, "Template not found.");
    }

    const templateData = templateSnap.data();
    if (!templateData) {
      return sendResponse(res, 404, "Template is empty.");
    }

    const deleteFilePromises = [
      ...templateData.attachements,
      templateData.html,
    ].map((fileName) =>
      bucket
        .file(fileName)
        .delete({ ignoreNotFound: true })
        .then(() => `${fileName} deleted.`)
        .catch(() => `unable to delete ${fileName}`)
    );

    const relatedMailList = (await db
      .collection(collections.mailList)
      .where("templateId", "==", templateSnap.id)
      .get()) as firestore.QuerySnapshot<MailListTypes.MailListDocumentData>;

    const relatedMailListItem = (await db
      .collection(collections.mailListItem)
      .where("templateId", "==", templateSnap.id)
      .get()) as firestore.QuerySnapshot<MailListItemTypes.MailListItemDocumentData>;

    const writeBatch = db.batch();

    [...relatedMailList.docs, ...relatedMailListItem.docs].forEach((doc) => {
      writeBatch.delete(doc.ref);
    });

    writeBatch.delete(templateSnap.ref);

    const promiseArr = [
      writeBatch
        .commit()
        .then(() => "All related documents deleted successfully"),
      ...deleteFilePromises,
    ];
    await Promise.all(promiseArr);

    return sendResponse(
      res,
      200,
      null,
      "Template and related email lists deleted successfully."
    );
  } catch (error) {
    console.error(error);
    return serverErrorResponse(res);
  }
};

// * Upload image to HTML mail template
const uploadImage = async (req: Request, res: Response) => {
  try {
    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
      return res.status(400).json({
        error: {
          message: "File not uploaded. Try again",
        },
      });
    }

    const fileName = (req.files[0] as UploadedFile).name;
    const file = bucket.file(fileName);

    const fileExists = (await file.exists())[0];
    if (!fileExists) {
      return res.status(400).json({
        error: {
          message: "File not found. Try again",
        },
      });
    }

    await file.makePublic();

    return res.status(200).json({
      url: file.publicUrl(),
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

export {
  newTemplate,
  listTemplates,
  openTemplate,
  deleteTemplate,
  uploadImage,
};
