//export { drive, isFileExists, initDrive } from "./helper";
import { google, drive_v3, GoogleApis } from "googleapis";
import { createWriteStream, createReadStream } from "fs";
import { DriveFileInfo } from "./types";
import { Logger } from "winston";
import jwt from "jsonwebtoken";
//import { promisify } from "util";

export let drive: drive_v3.Drive | unknown = undefined;

// we can init drive somewhere and set it here
export const setDrive = (drive_: drive_v3.Drive) => {
  drive = drive_;
};

export const getDrive = () => drive as drive_v3.Drive;

let parents: string[] = [];

export const getParents = () => {
  if (parents.length === 0) {
    parents.push(process.env.DRIVE_PARENT_ID as string);
  }

  return parents;
};

export const init_ = async (
  google: GoogleApis,
  private_key: string,
  client_email: string,
  projectId: string,
  setDrive: (drive_: drive_v3.Drive) => void,
  logger: Logger
) => {
  /*   let private_key = processEnv.DRIVE_PRIVATE_KEY as string;
    const client_email = processEnv.DRIVE_CLIENT_EMAIL as string;
    const projectId = processEnv.PROJECT_ID as string; */

  try {
    //let private_key = process.env.DRIVE_PRIVATE_KEY;
    if (process.env.IENV === "heroku") {
      private_key = private_key.replace(/\\n/g, "\n");
    }

    //google.auth.getAccessToken;

    const client = await google.auth.getClient({
      credentials: {
        private_key,
        client_email,
      },
      //credentials,
      scopes: "https://www.googleapis.com/auth/drive",
      projectId,
    });

    setDrive(
      google.drive({
        version: "v3",
        auth: client,
      })
    );
  } catch (err) {
    logger.log("error", "GOOGLE DRIVE INIT ERROR", {
      clientEmail: client_email,
      error: err,
      ienv: process.env.IENV,
    });
  }
};

//const jwtSign = promisify(jwt.sign);

// GET https://www.googleapis.com/youtube/v3/channels?access_token=access_token&part=snippet&mine=true

/* GET /youtube/v3/channels?part=snippet&mine=true HTTP/1.1
Host: www.googleapis.com
Authorization: Bearer access_token */
export const createToken =
  (
    privateKeyId: string,
    clientEmail: string,
    serviceUrl: string,
    privateKey: string
  ) =>
  () => {
    return jwt.sign(
      {
        iss: clientEmail,
        sub: clientEmail,
        // https://SERVICE.googleapis.com/.
        aud: serviceUrl,
        iat: Date.now(),
        exp: Date.now() + 10 * 60 * 1000,
      },
      privateKey,
      { algorithm: "RS256", keyid: privateKeyId }
    );
  };

export const init = (logger: Logger) =>
  init_(
    google,
    process.env.DRIVE_PRIVATE_KEY as string,
    process.env.DRIVE_CLIENT_EMAIL as string,
    process.env.PROJECT_ID as string,
    setDrive,
    logger
  );

export const createFolder_ =
  (getDrive: () => drive_v3.Drive) =>
  async (name: string): Promise<any> => {
    const fileMetadata = {
      name,
      mimeType: "application/vnd.google-apps.folder",
    };

    const res = await getDrive().files.create({
      //@ts-ignore
      resource: fileMetadata,
      fields: "id",
    });

    return res;
  };

export const createFolder = createFolder_(getDrive);

export const getFileInfoById_ =
  (getDrive: () => drive_v3.Drive) =>
  async (fileId: string): Promise<DriveFileInfo> => {
    const res = await getDrive().files.get({
      fileId,
    });

    const { id, name } = res.data;

    return {
      id,
      name,
    };
  };

export const getFileInfoById = getFileInfoById_(getDrive);

export const isFileExists_ =
  (getFileById: (fileId: string) => Promise<drive_v3.Schema$File>) =>
  async (fileId: string) => {
    try {
      await getFileById(fileId);

      return true;
    } catch (err: any) {
      if (err.toString().indexOf("File not found") > 0) {
        return false;
      } else {
        throw err;
      }
    }
  };

export const isFileExists = isFileExists_(getFileInfoById);

export const getAllFilesInfo_ =
  (getDrive: () => drive_v3.Drive) =>
  async (limit: number = 100): Promise<DriveFileInfo[]> => {
    const res = await getDrive().files.list({
      pageSize: limit,
      //files: "nextPageToken, files(id, name)",
    });

    const files = res.data.files;

    if (files === undefined) return [];

    return (res.data.files as drive_v3.Schema$File[]).map((file, i) => ({
      id: file.id,
      name: file.name,
      parents: file.parents,
      mimeType: file.mimeType,
    }));
  };

export const getAllFilesInfo = getAllFilesInfo_(getDrive);

// GOOGLE DRIVE CAN STORE MANY FILES WITH SAME NAME
// FOR SIMPLISITY WE CLAIM - ONE NAME - ONE ID
export const searchFileByName_ =
  (getDrive: () => drive_v3.Drive) =>
  async (photoName: string): Promise<DriveFileInfo | null> => {
    const res = await getDrive().files.list({
      q: `name='${photoName}'`,
      //fields: "nextPageToken, items(id, title)",
    });

    if (res.data.files === undefined || res.data.files.length === 0)
      return null;

    const { id, name } = res.data.files[0];

    return {
      id,
      name,
    };
  };

export const searchFileByName = searchFileByName_(getDrive);

export const getFileIdByItsName_ =
  (searchFileByName_: typeof searchFileByName) => async (name: string) => {
    const fileData = await searchFileByName_(name);

    return fileData !== null ? fileData.id : null;
    //await googleDrive.deleteFile(fileData.id);
  };

export const getFileIdByItsName = getFileIdByItsName_(searchFileByName);

/// UPLOAD / DOWNLOAD

export const downloadImageStream_ =
  (getDrive: () => drive_v3.Drive) => async (fileId: string) => {
    const res = await getDrive().files.get(
      { fileId, alt: "media" },
      { responseType: "stream" }
    );

    return res.data;
  };

export const downloadImageStream = downloadImageStream_(getDrive);

export const downloadImage_ =
  (getDrive: () => drive_v3.Drive) =>
  async (fileId: string, destPath: string) => {
    const dest = createWriteStream(destPath);

    const res = await getDrive().files.get(
      { fileId, alt: "media" },
      { responseType: "stream" }
    );

    return new Promise((resolve, reject) => {
      res.data
        .on("end", () => {
          //console.log("Done downloading file from Google drive.");
          resolve(undefined);
        })
        .on("error", (err: any) => {
          //console.error("Error downloading file from Google drive.");
          reject(err);
        })
        /*  .on("data", (data) => {
          progress += data.length;
          if (process.stdout.isTTY) {
            process.stdout.clearLine(0);
            process.stdout.cursorTo(0);
            process.stdout.write(`Downloaded ${progress} bytes`);
          }
        }) */
        .pipe(dest);
    });
  };

export const downloadImage = downloadImage_(getDrive);

export type UploadImageProps = {
  fileName: string;
  pathToPhoto: string;
  // "image/jpeg"
  mimeType?: string;
  readStream?: any;
};

export const uploadImage_ =
  (getDrive: () => drive_v3.Drive, getParents: () => string[]) =>
  async ({
    fileName,
    pathToPhoto,
    mimeType,
    readStream,
  }: UploadImageProps): Promise<DriveFileInfo> => {
    //const fileSize = statSync(pathToPhoto).size;

    const res = await getDrive().files.create(
      {
        requestBody: {
          parents: getParents(),
          name: fileName,
          mimeType,
        },
        media: {
          mimeType,
          body:
            readStream !== undefined
              ? readStream
              : createReadStream(pathToPhoto),
        },
      }
      /* {
      // Use the `onUploadProgress` event from Axios to track the
      // number of bytes uploaded to this point.
      onUploadProgress: (evt) => {
        const progress = (evt.bytesRead / fileSize) * 100;
        console.log(`${Math.round(progress)}% complete`);
      },
    } */
    );

    const { id, name } = res.data;

    return {
      id,
      name,
    };
  };

export const uploadImage = uploadImage_(getDrive, getParents);

export const updateImageFile_ =
  (getDrive: () => drive_v3.Drive) =>
  async (
    fileId: string,
    pathToPhotoFile: string,
    mimeType: string = "image/jpeg"
  ): Promise<DriveFileInfo> => {
    const res = await getDrive().files.update({
      fileId,
      media: {
        mimeType,
        body: createReadStream(pathToPhotoFile),
      },
    });

    const { id, name } = res.data;

    return { id, name };

    //console.log(`Response - ${JSON.stringify(res)}`);
  };

export const updateImageFile = updateImageFile_(getDrive);

///////// DELETE

export const deleteFile_ =
  (getDrive: () => drive_v3.Drive) => (fileId: string) => {
    return getDrive().files.delete({
      fileId,
    });

    //console.log(`Response - ${JSON.stringify(res)}`);
  };

export const deleteFile = deleteFile_(getDrive);

export const deleteAllFiles =
  (
    getDrive: () => drive_v3.Drive,
    getAllFiles: (limit: number) => Promise<drive_v3.Schema$File[]>,
    getParents: () => string[]
  ) =>
  async () => {
    const files = await getAllFiles(30);

    const promises = [];

    if (files.length === 0) {
      console.log("No files found.");
    } else {
      //console.log("Files:");
      for (const file of files) {
        //console.log(`${file.name} (${file.id})`);
        //console.log(` - File - ${file.name} | ${file.id} | ${file.mimeType}`);
        if (file.id === getParents()[0]) continue;

        promises.push(getDrive().files.delete({ fileId: file.id as string }));
        //console.log(` - Deleted - ${file.name} | ${file.id} | ${file.mimeType}`);
      }

      return Promise.all(promises);

      //console.log(`Deleted ${files.length - 1} files`);
    }
  };

export const removeFilesByNames =
  (
    deleteFile: (id: string) => Promise<void>,
    searchFileByName: (name: string) => Promise<drive_v3.Schema$File>
  ) =>
  async (names: string[]) => {
    if (!names || !names.length || names.length === 0)
      throw new Error("No names...");

    const promises = [];

    for (let name of names) {
      promises.push(searchFileByName(name));
    }

    const files = await Promise.all(promises);

    //const idsToDelete: string[] = [];
    const delPromises = [];

    for (let file of files) {
      if (file) {
        delPromises.push(deleteFile(file.id as string));
      }
    }

    return Promise.all(delPromises);
  };
