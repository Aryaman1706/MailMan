import multer from "multer";
import { bucket } from "../config/firebase";
import CustomStorageEngine from "../config/multerStorageEngine";

const storage = CustomStorageEngine({
  bucket,
});

const uploadFile = multer({
  storage,
});

export default uploadFile;
