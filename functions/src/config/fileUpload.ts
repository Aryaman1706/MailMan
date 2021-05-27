import { Request, Response, NextFunction } from "express";
import Busboy from "busboy";
import { v4 as uuid } from "uuid";
import { extname } from "path";
import { bucket } from "../config/firebase";

type Obj = { [key: string]: string };

const fileUploadPromise = (
  fileStream: NodeJS.ReadableStream,
  originalFileName: string,
  fieldName: string,
  fields: Obj
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
        fields[fieldName] = fileName;
        resolve(fileName);
      });
  });

const uploadFile = async (req: Request, _res: Response, next: NextFunction) => {
  const busboy = new Busboy({ headers: req.headers });

  const fields: Obj = {};

  busboy.on("field", (name, value) => {
    fields[name] = value;
  });

  const promiseArr: Promise<string>[] = [];

  busboy.on("file", (fieldName, fileStream, originalFileName) => {
    promiseArr.push(
      fileUploadPromise(fileStream, originalFileName, fieldName, fields)
    );
  });

  busboy.on("finish", async () => {
    await Promise.all(promiseArr);
    req.body = fields;
    next();
  });
};

export default uploadFile;
