import { Bucket, CreateWriteStreamOptions } from "@google-cloud/storage";
import { Request } from "express";
import multer from "multer";
import { v4 as uuidV4 } from "uuid";

type Options = {
  bucket: Bucket;
  name?: string;
  options?: CreateWriteStreamOptions;
};

interface CustomFileResult extends Partial<Express.Multer.File> {
  name: string;
}

class CustomStorageEngine implements multer.StorageEngine {
  private bucket: Bucket;
  private options: CreateWriteStreamOptions;
  public name: string;

  constructor(opts: Options) {
    this.bucket = opts.bucket;
    this.options = opts.options || {};
    this.name = opts.name || uuidV4();
  }

  _handleFile = (
    _req: Request,
    file: Express.Multer.File,
    cb: (error?: any, info?: CustomFileResult) => void
  ): void => {
    if (!this.bucket) {
      cb("bucket is a required field.");
      return;
    }

    const storageFile = this.bucket.file(this.name);
    const fileWriteStream = storageFile.createWriteStream(this.options);
    const fileReadStream = file.stream;

    fileReadStream.pipe(fileWriteStream);
    fileReadStream
      .on("end", () => {
        cb(null, { name: this.name });
      })
      .on("error", (err) => {
        fileWriteStream.end();
        storageFile.delete({ ignoreNotFound: true });
        cb(err);
      });
  };

  _removeFile = (
    _req: Request,
    _file: Express.Multer.File,
    cb: (error: Error | null) => void
  ): void => {
    this.bucket.file(this.name).delete({ ignoreNotFound: true });
    cb(null);
  };
}

export default (opts: Options) => {
  return new CustomStorageEngine(opts);
};
