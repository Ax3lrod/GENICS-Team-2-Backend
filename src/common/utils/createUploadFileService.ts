import multer from "multer";
import { createStorage } from "./storageService";

export const createUploadFileService = (storagePath: string) => {
  return multer({ storage: createStorage(storagePath) });
};
