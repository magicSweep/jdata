/* import {
  init as initDrive,
  isFileExists,
  uploadImage,
  updateImageFile,
} from "./../../../googleDrive"; */
//import { google, drive_v3, GoogleApis } from "googleapis";
import { Path } from "../../types";
import wait from "waait";
import { Logger } from "winston";

/*
 id, name, mimeType, originalFileName, size
*/
export const init = async (logger: Logger) => {
  await wait(500);
  return true;
};

export const isFileExists = async (photoId: string) => {
  await wait(1000);

  return true;
};

export const uploadImage = async (
  photoFileName: string,
  pathToPhoto: string
) => {
  await wait(2000);

  return {
    id: "superId",
    name: photoFileName,
  };
};

export const updateImageFile = async (
  googleDriveId: string,
  pathToPhoto: string
) => {
  await wait(2000);

  return {
    id: googleDriveId,
    name: "updated_photo",
  };
};

export const downloadImage = async (fileId: string, destPath: Path) => {
  await wait(2000);

  return true;
};
