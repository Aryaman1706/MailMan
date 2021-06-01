import { db, collections, bucket } from "../config/firebase";
import isEqual from "lodash.isequal";
import pick from "lodash.pick";
import { v4 } from "uuid";
import { Request, Response } from "express";
import { TemplateDocumentData } from "./customTypes";
import { types as MailListTypes } from "../mailList";
import juice from "juice";
import styles from "../utils/styles";

// * Utils
import * as validators from "../utils/validators/template";
import { firestore } from "firebase-admin";
import writeToFile from "./writeFilePromise";
import readFile from "./readFilePromise";

// * Create new template
export const newTemplate = async (req: Request, res: Response) => {
  try {
    // Validating req.body
    const { value, error } = validators.newTemplate(req.body);
    if (error) {
      return res.status(400).json({
        body: null,
        error: {
          msg: "Invalid inputs. Try again.",
          data: error.details[0].message,
        },
      });
    }

    // Validating format
    const { value: format, error: formatError } = validators.validateFormat(
      JSON.parse(value.format as string)
    );
    if (formatError) {
      return res.status(400).json({
        body: null,
        error: {
          msg: "Invalid inputs. Try again.",
          data: formatError.details[0].message,
        },
      });
    }

    value.format = format;

    // Handle attachements
    let attachements: string[] = [];
    if (req.files && Array.isArray(req.files) && req.files.length > 0) {
      attachements = (req.files as MailListTypes.UploadedFile[]).map(
        (file) => file.name
      );
    }

    // Save value.html in a file
    const fileName = `${v4()}.html`;
    const fileWriteStream = bucket.file(fileName).createWriteStream();

    const fileWriteResult: string = await writeToFile(
      fileWriteStream,
      juice.inlineContent(value.html, styles)
    )
      .then((d) => d)
      .catch((e) => e);

    if (fileWriteResult && fileWriteResult === "error") {
      return res.status(400).json({
        body: null,
        error: {
          msg: "Failed to write html to file",
          data: null,
        },
      });
    }

    const templateDocData: TemplateDocumentData = {
      title: value.title,
      subject: value.subject,
      html: fileName,
      attachements,
      format: value.format,
      date: firestore.Timestamp.now(),
    };

    // Save templateData
    await db.collection(collections.template).add(templateDocData);

    return res.status(200).json({
      body: {
        msg: "Successfull",
        data: null,
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
    const templateListSnap = (await db
      .collection(collections.template)
      .select("title", "date", "format")
      .orderBy("date", "desc")
      .get()) as firestore.QuerySnapshot<
      Pick<TemplateDocumentData, "date" | "title" | "format">
    >;

    if (templateListSnap.empty || templateListSnap.docs.length === 0) {
      return res.status(200).json({
        body: {
          msg: "No templates found",
          data: null,
        },
        error: null,
      });
    }

    const templateList = templateListSnap.docs.map((doc) => ({
      id: doc.id,
      title: doc.data().title,
      date: doc.data().date.toDate(),
      format: doc.data().format,
    }));

    return res.status(200).json({
      body: {
        msg: "Template List found.",
        data: templateList,
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

    if (!template.exists)
      return res.status(404).json({
        body: null,
        error: {
          msg: "Template not found.",
          data: null,
        },
      });

    const templateData = template.data();
    if (!templateData)
      return res.status(400).json({
        body: null,
        error: {
          msg: "Template is empty.",
          data: null,
        },
      });

    // Read html file
    const htmlReadStream = bucket.file(templateData.html).createReadStream();
    const htmlString = await readFile(htmlReadStream).catch(
      (err: Error) => err
    );

    if (typeof htmlString !== "string") {
      return res.status(400).json({
        body: null,
        error: {
          msg: "Error in reading html file.",
          data: htmlString.message,
        },
      });
    }

    return res.status(200).json({
      body: {
        msg: "Template found.",
        data: {
          ...template.data(),
          html: htmlString,
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
    const fileName = (req.file as MailListTypes.UploadedFile).name;
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
