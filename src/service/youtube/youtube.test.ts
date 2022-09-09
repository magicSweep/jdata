import { createReadStream } from "fs";
import { promisify } from "util";
import { join } from "path";
import { init, getVideosByIds, uploadVideo, deleteVideoById } from ".";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

//const pathToDownloadedPhoto = join(process.cwd(), "src", "static", "image.jpg");
const pathToVideoToUpload = join(
  process.cwd(),
  "src",
  "static",
  "VID_20191126_114144282.mp4"
);
//const pathToAnotherUploadPhoto = join(process.cwd(), "src", "static", "12.jpg");

jest.setTimeout(15000);

const logger = {
  log: jest.fn(),
};

describe("Youtube api", () => {
  beforeAll(async () => {
    await init(logger as any);
  });

  test.only("getVideosByIds", async () => {
    const res = await getVideosByIds(["ahU1GkXvTaM"]);

    expect(res).toEqual([
      {
        id: "ahU1GkXvTaM",
        thumbnailsUrl: "https://i.ytimg.com/vi/ahU1GkXvTaM/default.jpg",
        title: "Икота-икота",
        viewCount: "1",
      },
    ]);
    //expect(files).not.toEqual(undefined);
    //expect((files as any).length).toEqual(5);
  });

  test("uploadVideo", async () => {
    const videoStream = createReadStream(pathToVideoToUpload);

    const res = await uploadVideo({
      title: "",
      videoStream,
    });

    expect(res).toEqual("he");
    //expect(files).not.toEqual(undefined);
    //expect((files as any).length).toEqual(5);
  });

  test("deleteVideoById", async () => {
    await deleteVideoById("");

    expect(true).toEqual(true);
    //expect(files).not.toEqual(undefined);
    //expect((files as any).length).toEqual(5);
  });

  /* describe.skip("getAllFiles", () => {
      test("", async () => {
        //expect(process.env.DRIVE_PARENT_ID).toEqual("heloo");
        //expect(getParents()).toEqual("heloo");
  
        const files = await getAllFilesInfo();
  
        expect(files).toEqual("hello");
        //expect(files).not.toEqual(undefined);
        //expect((files as any).length).toEqual(5);
      });
    }); */
});
