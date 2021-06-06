import { Request, Response, NextFunction } from "express";
import Busboy from "busboy";
import { v4 as uuid } from "uuid";
import { extname } from "path";
import { bucket } from "../config/firebase";
import sendResponse from "../utils/functions/sendResponse";

type Obj = { [key: string]: string };

const fileUploadPromise = (
  fileStream: NodeJS.ReadableStream,
  originalFileName: string
): Promise<string> =>
  new Promise((resolve, reject) => {
    const fileExt = extname(originalFileName);
    const fileName = `${uuid()}${fileExt}`;
    const storageFile = bucket.file(fileName);
    const storageFileWS = storageFile.createWriteStream();
    fileStream
      .pipe(storageFileWS)
      .on("error", (err) => {
        storageFileWS.end();
        storageFile.delete({ ignoreNotFound: true });
        reject(err);
      })
      .on("finish", () => {
        resolve(fileName);
      });
  });

const uploadFile = async (req: Request, res: Response, next: NextFunction) => {
  const busboy = new Busboy({ headers: req.headers });

  const fields: Obj = {};

  busboy.on("field", (name, value) => {
    fields[name] = value;
  });

  const promiseArr: Promise<string>[] = [];

  busboy.on("file", (_, fileStream, originalFileName) => {
    promiseArr.push(fileUploadPromise(fileStream, originalFileName));
  });

  busboy.on("finish", async () => {
    try {
      // @ts-ignore
      req.files = await Promise.all(promiseArr);
      req.body = fields;
      next();
      return;
    } catch (error) {
      return sendResponse(res, 400, "Unable to upload files.");
    }
  });
};

export default uploadFile;
