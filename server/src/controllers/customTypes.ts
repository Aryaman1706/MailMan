import { Express } from "express";

export interface UploadedFile extends Express.Multer.File {
  name: string;
}
