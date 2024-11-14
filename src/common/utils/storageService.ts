import fs from "node:fs";
import path from "node:path";
import multer from "multer";

export const createStorage = (uploadPath: string, filename?: string) => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const newFileName = filename || file.originalname;
      cb(null, newFileName);
    },
  });
};

export const autoCreateDirectories = (path: string) => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
  }

  return path;
};

export const changeFileName = (filePath: string, newFileName: string) => {
  const directory = path.dirname(filePath);
  const ext = path.extname(filePath);
  const oldFileName = path.basename(filePath);

  const newFileNameWithExt = newFileName + ext;
  const newFilePath = path.join(directory, newFileNameWithExt);

  if (!fs.existsSync(filePath)) {
    throw new Error(`File ${oldFileName} tidak ditemukan`);
  }

  fs.renameSync(filePath, newFilePath);

  return {
    directory,
    path: newFilePath,
    filename: newFileNameWithExt,
    ext,
  };
};

export const cleanDirectory = (folderPath: string) => {
  fs.readdir(folderPath, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      const filePath = path.join(folderPath, file);
      fs.unlink(filePath, (err) => {
        if (err) throw err;
      });
    }
  });
};
