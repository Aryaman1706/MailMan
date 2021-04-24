export interface UploadedFile extends Express.Multer.File {
  name: string;
}
