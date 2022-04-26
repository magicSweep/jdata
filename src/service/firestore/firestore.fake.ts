import wait from "waait";

export const init = () => {};

export const addOne = (collectionName: string) => async (docData: any) => {
  await wait(1000);

  return true;
};

export const getOne =
  (collectionName: string) =>
  async (docId: string): Promise<any | undefined> => {
    await wait(1000);

    return {
      id: "1234567123456",
      src: "src",
      isActive: false,
      addedByUserUID: "userUid",
      files: ["file1", "file2"],
      googleDriveId: "googleDriveId",
      /* id: any;
  base64: string;

  files: string[];
  aspectRatio: number; //1.6
  srcSet: string;
  iconSrc: string;
  src: string;

  _timestamp: Date | FirestoreDate;
  description: string;
  date: T;
  yearsOld: number;
  tags: {
    [id: string]: boolean;
  };

  googleDriveId: string;
  imageExtention: ImgExt;
  addedByUserUID: string;
  // do we make changes by express
  isActive: boolean; */
    };
  };

export const deleteOne = (collectionName: string) => async (docId: string) => {
  await wait(1000);

  return true;
};

export const updateOne =
  (collectionName: string) => async (docId: string, fieldsToUpdate: any) => {
    await wait(1000);

    return true;
  };
