export type DriveFileInfo = {
  id?: string | null;
  name?: string | null;
};

export type UploadImageProps = {
  fileName?: string;
  pathToPhoto?: string;
  // "image/jpeg"
  mimeType?: string;
  readStream?: any;
};
