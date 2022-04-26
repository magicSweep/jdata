//import { init, upload, deleteMany } from ".";
import { UploadApiResponse } from "cloudinary";
import { Width, Path } from "../../types";
import wait from "waait";

/*  export interface UploadApiResponse {
        public_id: string;
        version: number;
        signature: string;
        width: number;
        height: number;
        format: string;
        resource_type: string;
        created_at: string;
        tags: Array<string>;
        pages: number;
        bytes: number;
        type: string;
        etag: string;
        placeholder: boolean;
        url: string;
        secure_url: string;
        access_mode: string;
        original_filename: string;
        moderation: Array<string>;
        access_control: Array<string>;
        context: object;
        metadata: object;

        [futureKey: string]: any;
    } */
export const uploadMany = async (pathsToPhotos: Path[]) => {
  await wait(2000);

  return pathsToPhotos.map((path, i) => {
    return {
      id: `public_id-${i}`,
      url: `https://${path}/qwe123-${i}`,
    };
  });
};

export const deleteMany = async (publicIds: string[]) => {
  await wait(1000);

  return publicIds.map(() => true);
};

export const init = () => {};
