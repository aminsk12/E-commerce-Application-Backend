import multer from "multer";
import path from "path";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import { ICloudinaryResponse, IFile } from "../app/interfaces/file";
import config from "../config";

cloudinary.config({
  cloud_name: config.cloudinary_cloud_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret,
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const uploadToCloudinary = async (
  file: IFile
): Promise<ICloudinaryResponse | undefined> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file.path,
      (error: Error, result: ICloudinaryResponse) => {
        fs.unlinkSync(file.path);
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

const multepaleImageuploadToCloudinary = async (
  ImagesFiles: IFile[]
): Promise<string[]> => {
  const uploadPromises = ImagesFiles.map(async (imageFile) => {
    const { secure_url }: any = await uploadToCloudinary(imageFile);
    return secure_url;
  });
  const secureUrls = await Promise.all(uploadPromises);

  return secureUrls;
};

export const fileUploader = {
  upload,
  uploadToCloudinary,
  multepaleImageuploadToCloudinary,
};