import { Request, Response, NextFunction } from "express";
import Busboy from "busboy";
import { v4 as uuid } from "uuid";
import { extname } from "path";
import { bucket } from "../config/firebase";
import sendResponse from "../utils/functions/sendResponse";
import onFinished from "on-finished";

type Obj = { [key: string]: string };

const drainStream = (stream: NodeJS.ReadableStream) => {
  stream.on("readable", stream.read.bind(stream));
};

const fileUploadPromise = (
  fileStream: NodeJS.ReadableStream,
  originalFileName: string
): Promise<Obj> =>
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
        resolve({ name: fileName });
      });
  });

const uploadFile = async (req: Request, res: Response, next: NextFunction) => {
  const busboy = new Busboy({ headers: req.headers });

  const fields: Obj = {};

  busboy.on("field", (name, value) => {
    fields[name] = value;
  });

  const promiseArr: Promise<Obj>[] = [];

  busboy.on("file", (_, fileStream, originalFileName) => {
    promiseArr.push(fileUploadPromise(fileStream, originalFileName));
  });

  busboy.on("finish", async (): Promise<Response | void> => {
    try {
      // @ts-ignore
      req.files = await Promise.all(promiseArr);
      req.body = fields;

      req.unpipe(busboy);
      drainStream(req);
      busboy.removeAllListeners();

      onFinished(req, () => {
        next();
      });
    } catch (error) {
      console.error(error);
      return sendResponse(res, 400, "Unable to upload files.");
    }
  });

  // @ts-ignore
  busboy.end(req.rawBody);
};

export default uploadFile;
