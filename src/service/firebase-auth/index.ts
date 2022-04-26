import { DecodedIdToken, getAuth } from "firebase-admin/auth";
import { AuthUser } from "./types";

export const getAuthUser = async (token: string): Promise<AuthUser> => {
  const decodedToken: DecodedIdToken = await getAuth().verifyIdToken(token);

  return {
    uid: decodedToken.uid,
  };
};
