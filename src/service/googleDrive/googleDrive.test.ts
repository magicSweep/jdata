import { readFile, writeFile, existsSync, unlinkSync } from "fs";
import { promisify } from "util";
import { join } from "path";
import {
  init,
  getAllFilesInfo,
  isFileExists,
  getFileInfoById,
  getParents,
  searchFileByName,
  getFileIdByItsName,
  downloadImage,
  uploadImage,
  deleteFile,
  updateImageFile,
  createFolder,
} from ".";
import wait from "waait";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const pathToDownloadedPhoto = join(process.cwd(), "src", "static", "image.jpg");
const pathToUploadPhoto = join(process.cwd(), "src", "static", "13.jpg");
const pathToAnotherUploadPhoto = join(process.cwd(), "src", "static", "12.jpg");

jest.setTimeout(15000);

const logger = {
  log: jest.fn(),
};

describe("Google drive", () => {
  beforeAll(async () => {
    await init(logger as any);
  });

  test.skip("Create folder", async () => {
    const res = await createFolder("portfolio");

    expect(res).toEqual("hello");
    //expect(files).not.toEqual(undefined);
    //expect((files as any).length).toEqual(5);
  });

  describe.skip("getAllFiles", () => {
    test("", async () => {
      //expect(process.env.DRIVE_PARENT_ID).toEqual("heloo");
      //expect(getParents()).toEqual("heloo");

      const files = await getAllFilesInfo();

      expect(files).toEqual("hello");
      //expect(files).not.toEqual(undefined);
      //expect((files as any).length).toEqual(5);
    });
  });

  describe.skip("isFileExists", () => {
    test("", async () => {
      const result = await isFileExists("18TjpqUaWK5fB3WHiLwsBBS4lengF9aRp");

      expect(result).toEqual(true);
    });
  });

  describe.skip("getFileById", () => {
    test("", async () => {
      const file = await getFileInfoById("18TjpqUaWK5fB3WHiLwsBBS4lengF9aRp");

      expect(file.name).toEqual("photo_1607217829308.jpg");
    });
  });

  describe("searchFileByName", () => {
    test("", async () => {
      const file = await searchFileByName("photo-1642515041749-398075704.webp");

      expect(file).not.toEqual(undefined);
      expect((file as any).name).toEqual("photo-1642515041749-398075704.webp");
    });
  });

  describe.skip("getFileIdByItsName", () => {
    test("", async () => {
      const fileId = await getFileIdByItsName("photo_1607217829308.jpg");

      expect(fileId).toEqual("18TjpqUaWK5fB3WHiLwsBBS4lengF9aRp");
    });
  });

  // downloadImageFromDrive
  describe.skip("downloadImageFromDrive", () => {
    test("", async () => {
      if (existsSync(pathToDownloadedPhoto)) {
        unlinkSync(pathToDownloadedPhoto);
      }

      const res = await downloadImage(
        "18TjpqUaWK5fB3WHiLwsBBS4lengF9aRp",
        pathToDownloadedPhoto
      );

      expect(existsSync(pathToDownloadedPhoto)).toEqual(true);
    });
  });

  describe.skip("uploadImageToDrive", () => {
    test("", async () => {
      const file = await uploadImage("photo_234ERETR.jpg", pathToUploadPhoto);

      const result = await isFileExists(file.id as string);

      expect(result).toEqual(true);
    });
  });

  // updateImageFile
  describe.skip("updateImageFile", () => {
    test("", async () => {
      const originalPhotoInfo = await uploadImage(
        "photo_234ERETR.jpg",
        pathToUploadPhoto
      );

      await wait(3000);

      //@ts-ignore
      const photoInfo = await updateImageFile(
        originalPhotoInfo.id as string,
        pathToAnotherUploadPhoto
      );

      expect(photoInfo.id).toEqual(originalPhotoInfo.id);

      //expect(file.data).toEqual("hello");
      //@ts-ignore
      //const result = await isFileExists((file).id);

      //expect(result).toEqual(true);
    });
  });

  describe.skip("deleteFile", () => {
    test("", async () => {
      // photo_234ERETR.jpg
      // photo-1649882438544-844719626.jpeg
      //@ts-ignore
      const fileId: string = await getFileIdByItsName(
        "photo-1649882438544-844719626.jpeg"
      );

      await deleteFile(fileId);

      const result = await isFileExists(fileId);

      expect(result).toEqual(false);
    });
  });
});
