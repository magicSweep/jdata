//const cloudinary = require("cloudinary").v2;
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { Path } from "../../types";
import { WebDriveImageInfo } from "./types";

export const init = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
};

export const deleteOne = (publicId: string) => {
  return cloudinary.uploader.destroy(publicId);
};

export const deleteMany = (publicIds: string[]) => {
  const promises: Promise<any>[] = publicIds.map((publicId) =>
    deleteOne(publicId)
  );

  /* for (let publicId of publicIds) {
    promises.push(deleteOne(publicId));
  } */

  return Promise.all(promises);
};

export const uploadOne = async (
  pathToUploadFile: string,
  tags: string = "lizzygram"
): Promise<WebDriveImageInfo> => {
  const res = await cloudinary.uploader.upload(pathToUploadFile, {
    tags,
  });

  return {
    id: res.public_id,
    url: res.secure_url,
  };
};

export const uploadMany = async (
  pathsToPhotos: Path[],
  tags: string = "lizzygram"
): Promise<WebDriveImageInfo[]> => {
  //const cloudinaryPhotosInfoDiffWidths = new Map<number, UploadApiResponse>();
  const imagesPromises: Promise<UploadApiResponse>[] = [];

  //@ts-ignore
  for (let path of pathsToPhotos) {
    let imageReq = cloudinary.uploader.upload(path, {
      tags,
    });

    imagesPromises.push(imageReq);
  }

  const responses = await Promise.all(imagesPromises);

  return responses.map((res, i) => ({
    id: res.public_id,
    url: res.secure_url,
  }));
};

export const getAll = (limit: number = 10) => {
  return cloudinary.api.resources({
    type: "upload",
    max_results: limit,
  });
};

export const getOneByPublicId = (publicId: string) => {
  return cloudinary.api.resource(publicId);
};
