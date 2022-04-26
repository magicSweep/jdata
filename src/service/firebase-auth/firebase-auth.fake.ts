import wait from "waait";
import { AuthUser } from "./types";

export const getAuthUser = async (token: string): Promise<AuthUser> => {
  await wait(100);

  return {
    uid: "uid12345rty",
  };
};
